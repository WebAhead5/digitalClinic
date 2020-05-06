const usersM = require("../../models/users.model")
const sessionModel = require("../../models/sessions.model")
const jsonwebtoken = require("jsonwebtoken")
const validator = require("../../models/validator")
const bcrypt = require('bcrypt')

exports.get = async (req,res,next)=>{

    if(!req.query.q)
        res.redirect("/")


    let jwt_secret = process.env.JWT_SECRET_RESET_PASSWORD;


    // if environment variable is not set
    if(!jwt_secret)
        return next(new Error("JWT_SECRET_RESET_PASSWORD must be set"))


    //decrypt cookie
    try {
        let {session_id} = jsonwebtoken.verify(req.query.q, jwt_secret)
        let sessionData = await getSessionData(session_id);

        if(sessionData)
            return res.render("resetPassword", {sessionID: sessionData.session_id})

    }
    catch (e) {

        //if cookie was tampers with or session expired
        return res.render("resetPassword", {error: "bad url"})

    }




}

exports.post = async (req,res,next)=>{

    if(!process.env.HASH_ITERATIONS)
        next(new Error("HASH_ITERATIONS must be set in the environment variables "))


    let {password,confirmPassword, sessionID} = req.body;
    const saltRounds = parseInt(process.env.HASH_ITERATIONS);


    //compare and passwords
    if(password !== confirmPassword)
      return   res.render("resetPassword", {error: "passwords do not match", sessionID})


    //validate password
    let validationRes = validator.validatePassword(password)
    if (!validationRes.isValid || validationRes.strength < Math.min(3,validationRes.total))
        return res.render("resetPassword", {error:"password is weak!", sessionID})


    //reset and delete session
   try {
       //get session data
       let sessionData = await getSessionData(sessionID)

       //hash password
       let hashedPass = await bcrypt.hash(password, saltRounds)

       //update passwords
       await usersM.updatePassword(sessionData.user_id, hashedPass)

       //end session
       await sessionModel.endSession(sessionData.session_id)

    }catch (e) {

       return res.render("resetPassword", {error:e.errorMessage})
   }


    //render successful
    res.render("resetPassword", {successful: true})



}


async function getSessionData(sessionId) {


    //get the session from the db
    let sessionData = await sessionModel.getBySessionId(sessionId)


    //if the session doesn't exist
    if (!sessionData)
        throw new Error('invalid URL');


    //if the session has expired, clear the cookies and continue
    if (sessionData.has_expired)
        throw new Error('session has expired');


    return sessionData;

}