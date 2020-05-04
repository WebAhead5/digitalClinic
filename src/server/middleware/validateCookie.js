const sessionModule = require("../../models/sessions.model")
const jwt = require("jsonwebtoken")


async function validateCredentials(req,res,next) {
    let token =req.cookie("user_token");
    if(token) {

        let jwtSecret = process.env.JWT_SECRET;

        if(!jwtSecret)
            next(Error("JWT_SECRET is not set as an environment variable"));


       let decoded = jwt.verify(token,jwtSecret)

        if(await sessionModule.isExpired(decoded))
            res.redirect("/logout")

        let sessionData = await sessionModule.getBySessionId(decoded)
        res.locals.user = {
            firstName: sessionData.first_name,
            lastName:  sessionData.last_name,
            email:  sessionData.email,
            id:  sessionData.user_id,
            isDoctor:  doctor_certificate,
            sessionID: decoded
        }


    }
    next();
}

module.exports = validateCredentials;