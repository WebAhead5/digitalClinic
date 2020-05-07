const usersM = require("../../models/users.model")
const sessionsM = require("../../models/sessions.model")
const jsonwebtoken = require("jsonwebtoken")
const nodemailer = require("nodemailer")


exports.get = (req,res)=>{

    res.render("forgotPassword",{title:"forgot password"})

}

exports.post = async (req,res)=>{
    let {email} = req.body;


    //get jwt secret
    let jwt_secret = process.env.JWT_SECRET_RESET_PASSWORD;
    let port = process.env.PORT || 3000;
    let sessionDuration = parseInt(process.env.RESET_PASS_SESSION_DURATION_MINS || 0);

    // if environment variable are not set
    if(!jwt_secret || !sessionDuration)
        res.render("forgotPassword",{title:"forgot password",error: "an error has occurred on our end"})


    //find user
    try {
     var userData =  await usersM.getUserByEmail(email)
    }catch (e) {
        return res.render("forgotPassword",{title:"forgot password",error: "an error has occurred on our end"})
    }

    //if user is not registered
    if(!userData)
        return res.render("forgotPassword",{title:"forgot password",error: "email is not registered"})


    //create a session
    let sessionData = await sessionsM.add(userData.user_id,sessionDuration)

    //create token
    const token = jsonwebtoken.sign({session_id:sessionData.session_id},jwt_secret)

    //email message
    //todo message
    let message = `go to ${req.protocol}://${req.hostname}:${port}/reset?q=${token}`;


    //send email and render result
    try {
        await sendEmail(req.hostname, userData.email, message);
        return res.render("forgotPassword", {successful: true})
    }
    catch (e) {
        // return res.render("forgotPassword", {title:"forgot password",error: "an error has occurred on our end"})
        return res.render("forgotPassword", {title:"forgot password",error: e.message})
    }

}



async function sendEmail(hostName, toEmail, message) {
    //create the means to send an email
    let transporter;




        //running in development
        let testAccount = await nodemailer.createTestAccount();
        console.log("go to https://ethereal.email/login to view the email that was sent ot the user");
        console.log(`email: ${testAccount.user}  password: ${testAccount.pass}`);

        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });




    //send email
    await transporter.sendMail({
        from: '"Damaris Rosenbaum  👻" <foo@example.com>', // sender address
        to: toEmail, // list of receivers
        subject: "Reset password", // Subject line
        text: message, // plain text body
        html: `<h3><b>${message}</b></h3>` // html body
    });

    //todo send a real email
    throw new Error(`for how this feature is only available in development and not in production go to https://ethereal.email/messages to check the sent email.  your credentials are email: ${testAccount.user}  password: ${testAccount.pass}`)

}
