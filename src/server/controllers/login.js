const { getUserByEmail } = require('../../models/users.model');
const bcrypt = require('bcrypt');


exports.post = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const emaildb = await getUserByEmail(email);

        if (!emaildb)
            return res.render("login", {
                error: 'Email does not exist',
                title: "login"
            })

        let result = await bcrypt.compare(password, emaildb.password);
        // let result = (password === emaildb.password)
        console.log(emaildb.password)
        if (!result) {
            return res.render('login', {
                error: 'Password is incorrect',
                title:"login"
            });
        }

        res.locals.loginUserID = emaildb.user_id;
        next()
    }
    catch (e) {
        next(e)
    }


}


exports.get = (req, res) => {
    res.render("login", {title:"login"})

}
