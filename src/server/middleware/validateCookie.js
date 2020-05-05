const sessionModule = require("../../models/sessions.model")
const jwt = require("jsonwebtoken")


async function validateCredentials(req,res,next) {


  //  return next();

    let token;

    if(req.cookies && req.cookies.user_token)
        token =req.cookies.user_token;

    if(token) {

        let jwtSecret = process.env.JWT_SECRET;

        if(!jwtSecret)
           return  next(Error("JWT_SECRET is not set as an environment variable"));


        let decoded;

        try {
            decoded =  jwt.verify(token, jwtSecret)
        } catch (e) {
            res.clearCookie("user_token");
            res.locals.user = undefined;
        }

        try {
            let sessionData = await sessionModule.getBySessionId(decoded.session_id)
            res.locals.user = {
                firstName: sessionData.first_name,
                lastName: sessionData.last_name,
                email: sessionData.email,
                id: sessionData.user_id,
                doctorCer: sessionData.doctor_certificate,
                sessionID: decoded.session_id
            }
        } catch (e) {
            next(e)
        }


        if(await sessionModule.isExpired(decoded.session_id))
            return res.redirect("/logout")

    }
    next();
}

module.exports = validateCredentials;