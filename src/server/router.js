//create router
const router = require('express').Router();

//register Middlewares
const {redirectHome} = require('./middlewares/index')


//import controllers/handlers - todo import the handlers

const homeRoute = require("./controllers/homeRoute");
const registerRoute = require('./controllers/registerRoute')
const error = require('./controllers/error');
const logOut = require('./controllers/logout');



//assign handlers to routes - todo assign imported handlers

router.get("/",homeRoute.get);

// router.get("/register",redirectHome,registerRoute.get);
// router.post("/register",redirectHome,registerRoute.post);
// router.get("/register",registerRoute.get);
// router.post("/register",registerRoute.post);
router.route('/register').get(registerRoute.get).post(registerRoute.post)


router.get('/logout', logOut);

//error handling
router.use(error.client);
router.use(error.server);

module.exports = router;
