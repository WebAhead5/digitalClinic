
const {Pool}  = require('pg');
require("dotenv").config()

//todo setup environment variables
let connectionString = process.env.DB_URL;


if(process.env.NODE_ENV !== "production")
    connectionString = process.env.DB_TEST_URL;


if(!connectionString)
    throw new Error('Env variable DB_URL or DB_TESTING_URL must be set');

const dbConnection = new Pool({connectionString});
module.exports = dbConnection;
