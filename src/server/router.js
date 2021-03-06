//create router
const router = require('express').Router();

const homeRoute = require("./controllers/homeRoute");
const login = require('./controllers/login');
const registerRoute = require('./controllers/register')
const error = require('./controllers/error');
const logout = require('./controllers/logout');
const questions = require("./controllers/questions")
const questionForum = require("./controllers/questionForum")
const dashBoard = require("./controllers/dashboard")

const forgotPassword = require("./controllers/forgotPassword")
const resetPassword = require("./controllers/resetPassword")

const validateLogin = require("./middleware/validateCookie")
const createSession = require("./middleware/createSession")
const redirection = require("./middleware/loggedInRedirection")

const csrfProtection  = require("csurf")({ cookie: true })

router.use(validateLogin);

router.route('/login')
    .all(redirection.ifLoggedIn("/dashboard"))
    .get(login.get)
    .post(login.post,createSession);

router.route('/register')
    .all(redirection.ifLoggedIn("/dashboard"),csrfProtection)
    .get(registerRoute.get)
    .post(registerRoute.post,createSession)

router.route(['/forg[eo]t',"/forgotPassword"])
    .all(redirection.ifLoggedIn("/dashboard"))
    .get(forgotPassword.get)
    .post(forgotPassword.post);

router.route(['/reset',"/resetPassword"])
    .all(redirection.ifLoggedIn("/dashboard"))
    .get(resetPassword.get)
    .post(resetPassword.post);

router.route("/dashboard")
    .all(redirection.ifNotLoggedIn("/login"),csrfProtection)
    .get(dashBoard.get)
    .post(dashBoard.post)

router.route("/question/:question_id")
    .all(redirection.ifNotLoggedIn("/login"),csrfProtection)
    .get(questionForum.get)
    .post(questionForum.post)

router.get("/",homeRoute.get);
router.get('/questions', redirection.ifNotLoggedIn("/login"),questions.get);
router.get('/logout', logout.get);


//error handling
router.use(error.client);
router.use(error.server);

module.exports = router;
