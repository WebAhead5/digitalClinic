const _tape = require('tape')
const _test = require('tape-promise').default // <---- notice 'default'
const tape = _test(_tape)
const supertest = require("supertest")

const questionsModel = require("../src/models/questions.model");
const answersModel = require("../src/models/answers.model");
const sessionsModel = require("../src/models/sessions.model");
const userModel = require("../src/models/users.model");

const dbConnection = require("../src/database/db_connection");
const runDbBuild = require('../src/database/db_build')

tape.test("check if tape works for db tests", t => {

    t.true(true, "tape is working")
    t.end();
})


//testing retreiving from the database
tape('The result returned from getAll', (t) => {
    runDbBuild(function (err, res) {
        userModel.getAll(async function (err, res) {
            t.equals(res.length, 45, "the length of the array");
            t.end();
        })
    })
})