//create router
const router = require('express').Router();

const homeRoute = require("./controllers/homeRoute");
const login = require('./controllers/login');
const registerRoute = require('./controllers/registerRoute')
const error = require('./controllers/error');
const logout = require('./controllers/logout');
const questions = require("./controllers/questions")
const dashBoard = require("./controllers/dashboard")

const validateLogin = require("./middleware/validateCookie")
const createSession = require("./middleware/createSession")


router.use(validateLogin);
router.get("/",homeRoute.get);
router.route('/login').get(login.get).post(login.post,createSession);
router.route('/register').get(registerRoute.get).post(registerRoute.post,createSession)
router.get('/questions',questions.get);
router.route("/dashboard").get(dashBoard.get).post(dashBoard.post)
router.get('/logout', logout.get);


//error handling
router.use(error.client);
router.use(error.server);

module.exports = router;
