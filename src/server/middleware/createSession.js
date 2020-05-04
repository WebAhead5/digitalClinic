const sessionModule = require("../../models/sessions.model")
const jwt = require("jsonwebtoken")

async function createSession  (req,res,next){

    let sessionDuration = process.env.SESSION_DURATION_MINS;
    let jwtSecret = process.env.JWT_SECRET;

    if(!sessionDuration)
        next(new Error("SESSION_DURATION_MINS is not set as an environment variable"));

    if(!jwtSecret)
        next(new Error("JWT_SECRET is not set as an environment variable"));

    if(req.locals && req.locals.login.userID) {
        let session = await sessionModule.add(req.locals.userID, sessionDuration);
        let sessionID = session.session_id;
        res.cookie ("user_token" ,jwt.sign({session_id:sessionID},jwtSecret))
    }
    res.redirect("/dashboard")

}

module.exports = createSession;