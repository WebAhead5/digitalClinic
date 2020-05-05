const sessionModule = require("../../models/sessions.model")
const jwt = require("jsonwebtoken")

async function createSession  (req,res,next){

    let sessionDuration = process.env.SESSION_DURATION_MINS;
    let jwtSecret = process.env.JWT_SECRET;

    if(!sessionDuration)
        next(new Error("SESSION_DURATION_MINS is not set as an environment variable"));

    if(!jwtSecret)
        next(new Error("JWT_SECRET is not set as an environment variable"));

    if(res.locals && res.locals.loginUserID) {
        let session = await sessionModule.add(res.locals.loginUserID, sessionDuration);
        let sessionID = session.session_id;
        res.cookie ("user_token" ,jwt.sign({session_id:sessionID},jwtSecret))
       return  res.redirect("/dashboard")
    }
    next(new Error("an error accrued while creating the user session"))
}

module.exports = createSession;