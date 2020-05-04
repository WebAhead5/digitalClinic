const _tape = require('tape')
const _test = require('tape-promise').default // <---- notice 'default'
const tape = _test(_tape)
const supertest = require("supertest")

const questionsModel = require("../src/models/questions.model");
const answersModel = require("../src/models/answers.model");
const dbConnection = require("../src/database/db_connection");

tape.test("check if tape works for db tests",t=>{

    t.true(true,"tape is working")
    t.end();
})
tape.test("add question to questions table", async t=>{

    try {
        let res= await questionsModel.add(0, "hey wazzaaaaaaaapppppppp")
        t.equals(res.rowCount,1,"added successfully")
    } catch (e) {
        t.error(e, "added successfully")
    }

    t.end();

})
tape.test("add answer to answers table", async t=>{

    try {
        let res=   await answersModel.add(0, 0, "hey wazzaaaaaaaapppppppp")
        t.equals(res.rowCount,1,"added successfully")

    } catch (e) {
        t.error(e, "added successfully")
    }

    t.end();
})