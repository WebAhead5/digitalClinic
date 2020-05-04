//create router
const router = require("express").Router();


//import controllers/handlers - todo import the handlers
const homeRoute = require("./controllers/homeRoute");
const error = require("./controllers/error");
const login = require('./controllers/login');



//assign handlers to routes - todo assign imported handlers
router.get("/",homeRoute.get);
router.get('/login', login.authenticate);



//error handling
router.use(error.client);
router.use(error.server);


module.exports = router;