const sessionModel = require("../../models/sessions.model")
const jwt = require("jsonwebtoken")


async function validateCredentials(req,res,next) {


    //----------------------------------------------------------------------------------
    //get jwt secret
    let jwtSecret = process.env.JWT_SECRET;

    //if the secret is not loaded redirect to 502
    if (!jwtSecret)
        return next(Error("JWT_SECRET is not set as an environment variable"));


    //if the cookie doesn't exist
    if (!req.cookies || !req.cookies.user_token)
        return next();

    //----------------------------------------------------------------------------------

    //get cookie
    let cookieData = req.cookies.user_token;


    //decrypt cookie
    try {

        //if the cookie is encoded successfully
        var {session_id} = jwt.verify(cookieData, jwtSecret)

    }
    catch (e) {

        //otherwise - it was tampered with

        //clear cookie
        res.clearCookie("user_token");
        return next();

    }


    //handle session
    try {

        //get the session from the db
        let sessionData = await sessionModel.getBySessionId(session_id)


        //if the session doesn't exist, clear the cookies and continue
        if (!sessionData) {
            res.clearCookie('user_token');
            return next();
        }

        //if the session has expired, clear the cookies and continue
        if(sessionData.has_expired){
            res.clearCookie('user_token');
            return next();
        }


        //load the data into locals
        res.locals.user = {
            firstName: sessionData["first_name"],
            lastName: sessionData["last_name"],
            email: sessionData["email"],
            id: sessionData["user_id"],
            doctorCer: sessionData["doctor_certificate"],
            sessionID: session_id
        }


    } catch (e) {
        next(e)
    }


    next();
}

module.exports = validateCredentials;