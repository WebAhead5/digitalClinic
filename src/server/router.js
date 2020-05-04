//create router
const router = require('express').Router();

//import controllers/handlers - todo import the handlers
const homeRoute = require('./controllers/homeRoute');
const error = require('./controllers/error');
const logOut = require('./controllers/logout');

//assign handlers to routes - todo assign imported handlers

router.get('/', homeRoute.get);
router.get('/logout', logOut);

//error handling
router.use(error.client);
router.use(error.server);

module.exports = router;
