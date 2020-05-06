const _tape = require('tape')
const _test = require('tape-promise').default // <---- notice 'default'
const tape = _test(_tape)
const supertest = require("supertest")
const app = require("../src/server/app");



tape.test("check if tape works for server tests",t=>{

    t.true(true,"tape is working")
    t.end();
})

