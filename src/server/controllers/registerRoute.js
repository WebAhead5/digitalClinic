const registerMid = require('../middlewares/registerMid')


exports.get = (req, res) => {
    res.render("register", {
        title: "register"
    });
};



exports.post = (req, res) => {
    const { email, password } = req.body;
    if (d) {
        //validation of feilds 
    } else if (s) {
        //check if exists 
    } else {
        return res.redirect('/home');
    }
}