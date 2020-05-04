const { isEmptyString, isLettersAndSpaces, validatePassword, passwordsMatch } = require('../../models/validator');

const { getUserByEmail, add } = require('../../models/users.model')

exports.get = (req, res) => {
    res.render("register", {
        title: "register"
    });
};


//{ isEmptyString, isLettersAndSpaces, validatePassword, passwordsMatch }
exports.post = async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;


    console.log('the get element', req.body)


    if (!passwordsMatch(password, confirmPassword))
        return res.render('register', {
            title: "register",
            error: 'Passwords do not match!'
        });



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

//await inside the try - in this case, add func will run and just after the res of 
//Add func it will proceed to res.redirects
    try {
        await add(firstName, lastName, email, doctorCertificate)
        res.redirect('/home')
    } catch (error) {
        throw new Error('not')
    }
}
