
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const handlebars = require('express-handlebars');
const hbsHelpers = require('../views/viewHelpers');
const router = require('./router');
const cookieParser = require("cookie-parser")
const helmet = require("helmet")



//create the server instance
const app = express();

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
//setup the fav-icon using serve-favicon
app.use(
  favicon(path.join(__dirname, '..', '..', 'public', 'res', 'favicon.ico'))
);

//hide the server type
app.disable('x-powered-by');

//setup handlebars
app.set('views', path.join('src', 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    helpers: hbsHelpers,
  })
);

//setup the statics folder using serve-static
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

//use the router
app.use(router);

module.exports = app;
