const {getUserByEmail} = require('../../models/users.model');
const bcrypt = require('bcrypt');


exports.authenticate = async (req, res, next) => {

    const { email, password } = req.body;

    const emaildb = await getUserByEmail(email);

    try {

        let result = await bcrypt.compare(password, emaildb.password);
        if (!result) {
            return res.render('login', {
                error: 'Password is incorrect'
            });
        }

        res.locals.login.userID = emaildb.user_id;
        next()
    }
    catch (e) {
        next(e)
    }


}



