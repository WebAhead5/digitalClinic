const _tape = require('tape')
const _test = require('tape-promise').default // <---- notice 'default'
const tape = _test(_tape)
const supertest = require("supertest")

const questionsModel = require("../src/models/questions.model");
const answersModel = require("../src/models/answers.model");
const sessionsModel = require("../src/models/sessions.model");

const dbConnection = require("../src/database/db_connection");

tape.test("check if tape works for db tests",t=>{

    t.true(true,"tape is working")
    t.end();
})
