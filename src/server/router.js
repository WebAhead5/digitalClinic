//create router
const router = require('express').Router();

//import controllers/handlers - todo import the handlers

const homeRoute = require("./controllers/homeRoute");
const login = require('./controllers/login');
const registerRoute = require('./controllers/registerRoute')
const error = require('./controllers/error');
const logOut = require('./controllers/logout');
const questions = require("./controllers/questions")

const validateLogin = require("./middleware/validateCookie")
const createSession = require("./middleware/createSession")
//assign handlers to routes - todo assign imported handlers
router.use(validateLogin);

router.get("/",homeRoute.get);
router.get('/login', login.authenticate,createSession);
router.route('/register').get(registerRoute.get).post(registerRoute.post)
router.get('/logout', logOut.get);
router.get('/questions',questions.get );

//error handling
router.use(error.client);
router.use(error.server);

module.exports = router;
