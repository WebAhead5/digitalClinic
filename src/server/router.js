//create router
const router = require('express').Router();

<<<<<<< HEAD
//import controllers/handlers - todo import the handlers
=======
//register Middlewares
const {redirectHome} = require('./middlewares/index')

>>>>>>> 3eb5da078369c7ad241430a48c6fbc1a3394bc67

const homeRoute = require("./controllers/homeRoute");
const login = require('./controllers/login');
const registerRoute = require('./controllers/registerRoute')
const error = require('./controllers/error');
const logOut = require('./controllers/logout');
const questions = require("./controllers/questions")
const dashBoard = require("./controllers/dashboard")

const validateLogin = require("./middleware/validateCookie")
const createSession = require("./middleware/createSession")

router.use(validateLogin);
router.get("/",homeRoute.get);
router.route('/login').get(login.get).post(login.post,createSession);
router.route('/register').get(registerRoute.get).post(registerRoute.post,createSession)
router.get('/logout', logOut.get);
router.get('/questions',questions.get);
router.get("/dashboard",dashBoard.get)


//error handling
router.use(error.client);
router.use(error.server);

module.exports = router;
