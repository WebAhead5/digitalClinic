const sessionModule = require("../../models/sessions.model")
const jwt = require("jsonwebtoken")

async function createSession  (req,res,next){


    let sessionDuration = parseInt(process.env.SESSION_DURATION_MINS);

    let jwtSecret = process.env.JWT_SECRET;

    if(!sessionDuration)
        next(new Error("SESSION_DURATION_MINS is not set as an environment variable"));

    if(!jwtSecret)
        next(new Error("JWT_SECRET is not set as an environment variable"));

    //--------------------------------------------------------------------------------------------------

    //if the user hasn't logged in - if the middleware wasn't provided with a user id
    if(!res.locals || !res.locals.loginUserID)
        next(new Error("an error accrued while creating the user session - res.locals.loginUserID was not provided "))


    // create session
    let session = await sessionModule.add(res.locals.loginUserID, sessionDuration);
    let sessionID = session.session_id;

    //set the session id
    res.cookie ("user_token" ,jwt.sign({session_id:sessionID},jwtSecret))

    //redirect the user to /dashboard after a successful log in
    return  res.redirect("/dashboard")

}

module.exports = createSession;