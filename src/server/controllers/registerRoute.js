const { isEmptyString, isLettersAndSpaces, validatePassword, passwordsMatch } = require('../../models/validator');

const { getUserByEmail, add } = require('../../models/users.model')

exports.get = (req, res) => {
    res.render("register", {
        title: "register"
    });
};


//{ isEmptyString, isLettersAndSpaces, validatePassword, passwordsMatch }
exports.post = async (req, res, next) => {
    const { firstName, lastName, email, password, confirmpassword, doctorCertificate } = req.body;
console.log(req.body)

    

    if(!validatePassword(password)){
        return res.render('register', {
            title:"register",
            error: errorMessage
        })
    } 

    if (!passwordsMatch(password, confirmpassword))
        return res.render('register', {
            title: "register",
            error: errorMessage
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

        //hashing pass
    //await inside the try - in this case, add func will run and just after the res of 
    //Add func it will proceed to res.redirects
    try {
       const userObj = await add(firstName, lastName, email, doctorCertificate, password) 
        
        res.locals.loginUserID = userObj.user_id;
        next()
    
    } catch (error) {
        console.log(error.message)
        next( new Error('the error in the register post'))
    }
}


