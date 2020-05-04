//create router
const router = require("express").Router();


//register Middlewares
const {redirectHome} = require('./middlewares/index')


//import controllers/handlers - todo import the handlers
const homeRoute = require("./controllers/homeRoute");
const registerRoute = require('./controllers/registerRoute')
const error = require("./controllers/error");




//assign handlers to routes - todo assign imported handlers
router.get("/",homeRoute.get);

router.get("/register",redirectHome,registerRoute.get);
router.post("/register",redirectHome,registerRoute.post);


//error handling
router.use(error.client);
router.use(error.server);


module.exports = router;