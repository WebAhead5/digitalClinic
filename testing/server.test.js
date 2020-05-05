const _tape = require('tape')
const _test = require('tape-promise').default // <---- notice 'default'
const tape = _test(_tape)
const supertest = require("supertest")
const app = require("../src/server/app");



tape.test("check if tape works for server tests",t=>{

    t.true(true,"tape is working")
    t.end();
})


_tape.test("test GET /questions route",t=>{

    supertest(app)
        .get("/questions")
        .expect(200)
        .end((err, res)=>{

            t.error(err, "no errors");
            t.ok(Array.isArray(res.body), "returns an array");
            t.end()


        })

})