const _tape = require('tape')
const _test = require('tape-promise').default // <---- notice 'default'
const tape = _test(_tape)
const supertest = require("supertest")

// check https://www.npmjs.com/package/tape-promise for more info about tape-promise

tape.test("check if tape works for server tests",t=>{

    t.true(true,"tape is working")
    t.end();
})