const { isEmptyString, isLettersAndSpaces, validatePassword, passwordsMatch } = require('../../models/validator');

const { getUserByEmail, add } = require('../../models/users.model')

const bcrypt = require('bcrypt')
const saltRounds = process.env.HASH_ITERATIONS || 10;


exports.get = (req, res) => {
    res.render("register", {
        title: "register"
    });
};


//{ isEmptyString, isLettersAndSpaces, validatePassword, passwordsMatch }
exports.post = async (req, res, next) => {
    const { firstName, lastName, email, password, confirmpassword, doctorCertificate } = req.body;
    console.log(req.body)

    //check password straight
    let validation = validatePassword(password)
    if (!validation.isValid) {
        return res.render('register', {
            title: "register",
            error: validation.errorMessage
        })
    }

    //check compare password fields
    validation = passwordsMatch(password, confirmpassword)
    if (!validation.isValid) {
        return res.render('register', {
            title: "register",
            error: validation.errorMessage
        })
    }


    //check if email has already been used
    let userData;
    try {
        userData = await getUserByEmail(email)

    } catch (e) {
        return res.render('register', {
            title: "register",
            error: e.message
        })
    }

    if (userData)
        return res.render('register', {
            title: "register",
            error: "Email is already in use!"
        })


    try {


        //hashing the pass
        let hashedPass = bcrypt.hashSync(password, saltRounds)
        // console.log('the hashedPass is :::::::', hashedPass);


        //add user to the database
        const userObj = await add(firstName, lastName, email, doctorCertificate, hashedPass)
        //store user id in a locals inorder to create a session for him
        res.locals.loginUserID = userObj.user_id;


        //go to createSession middleware
        next()

    } catch (error) {

        // console.log(error.message)
        next(new Error('the error in the register post'))
    }
}


