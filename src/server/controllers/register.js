const { isEmptyString, isLettersAndSpaces, validatePassword, passwordsMatch } = require('../../models/validator');
const { getUserByEmail, add } = require('../../models/users.model')

const helpers = require('../../views/viewHelpers')

const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.HASH_ITERATIONS);


exports.get = (req, res) => {
    res.render("register", {
        title: "register",
        csrfToken: req.csrfToken()
    });
};


//{ isEmptyString, isLettersAndSpaces, validatePassword, passwordsMatch }
exports.post = async (req, res, next) => {
    const { firstName, lastName, email, password, confirmpassword, doctorCertificate } = req.body;

    //check password straight
    let validation = validatePassword(password)
    if (!validation.isValid || validation.strength <= Math.min(3,validation.total)) {
        return res.render('register', {
            title: "register",
            error: validation.errorMessage,
            csrfToken: req.csrfToken()
        })
    }

    //check compare password fields
    validation = passwordsMatch(password, confirmpassword)
    if (!validation.isValid) {
        return res.render('register', {
            title: "register",
            error: validation.errorMessage,
            csrfToken: req.csrfToken()
        })
    }


    //check if email has already been used
    let userData;
    try {
        userData = await getUserByEmail(email)

    } catch (e) {
        return res.render('register', {
            title: "register",
            error: e.message,
            csrfToken: req.csrfToken()
        })
    }

    if (userData)
        return res.render('register', {
            title: "register",
            error: "Email is already in use!",
            csrfToken: req.csrfToken()
        })


    try {
        //hashing the pass
        // let hashedPass = bcrypt.hashSync(password, saltRounds)
        // console.log(process.env.HASH_ITERATIONS);
        let hashedPass = await bcrypt.hash(password, saltRounds)
        
        //add user to the database
        const userObj = await add(firstName, lastName, email, doctorCertificate, hashedPass)

        //store user id in a locals inorder to create a session for him
        res.locals.loginUserID = userObj.user_id;

        //go to createSession middleware
        next()

    } catch (error) {
        console.log(error.message)
        next(new Error('the error in the register post'))
    }
}


exports.hiddenElement = () => {
    document.getElementById('doctor').addEventListener('click', helpers.toggler());
}

