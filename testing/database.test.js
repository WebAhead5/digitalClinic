const _tape = require('tape')
const _test = require('tape-promise').default // <---- notice 'default'
const tape = _test(_tape)
const supertest = require("supertest")

const questionsModel = require("../src/models/questions.model");
const answersModel = require("../src/models/answers.model");
const sessionsModel = require("../src/models/sessions.model");
const userModel = require("../src/models/users.model");

const dbBuild = require("../src/database/db_build");
const dbConnection = require("../src/database/db_connection");


tape.test("check if tape works for db tests", t => {

    t.true(true, "tape is working")
    t.end();
})


tape('test users.getAll()', async (t) => {
    await dbBuild();

    try {
        let user = await userModel.getAll();
        t.ok(Array.isArray(user), "returns an array");

    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})

tape('test users.getDoctors() after adding a doctor to the db', async (t) => {
    await dbBuild();
    await dbConnection.query("insert into users (first_name, last_name, email, password, doctor_certificate) values('aa','bb','cc','123','true')")
    try {
        let user = await userModel.getDoctors();
        t.ok(Array.isArray(user), "returns an array");
        t.ok(user.some(x=>x.first_name === "aa"), "the inserted user was returned");

    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})

tape('test users.getNonDoctors() after adding a non - doctor user', async (t) => {
    await dbBuild();
    await dbConnection.query("insert into users (first_name, last_name, email, password, doctor_certificate) values('aa','bb','cc','123','')")
    try {
        let user = await userModel.getNonDoctors();
        t.ok(Array.isArray(user), "returns an array");
        t.ok(user.every(x=>x.first_name !== "aa"), "the inserted user was not returned");

    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})

tape('test users.getUserByEmail() after adding the user', async (t) => {
    await dbBuild();
    await dbConnection.query("insert into users (first_name, last_name, email, password, doctor_certificate) values('aa','bb','cc','123','')")
    try {
        let user = await userModel.getUserByEmail("cc");
        t.ok(user, "returns an object");
        t.equals(user.first_name , "aa", "the inserted user was returned");

    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})

tape('test users.getUserByEmail() of a non existing user', async (t) => {
    await dbBuild();
    try {
        let user = await userModel.getUserByEmail("cc");
        t.ok(!user, "returns undefined");
    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})

tape('test users.getUserById() after adding a user', async (t) => {
    await dbBuild();
    await dbConnection.query("insert into users (first_name, last_name, email, password, doctor_certificate) values('aa','bb','cc','123','')")
    let {rows:[{count}]} = await dbConnection.query("select count(*) from users")

    try {
        let user = await userModel.getUserById(parseInt(count));
        t.ok(user, "returns the user");
    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})

tape('test users.getUserById() of a non existing user', async (t) => {
    await dbBuild();
    try {
        let user = await userModel.getUserById(30);
        t.ok(!user, "returns undefined");
    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})

tape('test users.getUserById() of an incorrect format id', async (t) => {
    await dbBuild();
    try {
        await userModel.getUserById("abc");
    } catch (e) {
        t.ok(e,"throws an error")
    }

    t.end();

})

tape('test users.add() with missing params', async (t) => {
    await dbBuild();
    //-----------------------------------------------------------
    try {
        await userModel.add("a");
        t.ok(false,"should not pass")
    } catch (e) {
        t.ok(e,"throws an error when provided with [first_name] ")
    }
    //-----------------------------------------------------------
    try {
        await userModel.add("first","last");
        t.ok(false,"should not pass")
    } catch (e) {
        t.ok(e,"throws an error when provided with [first_name,last_name]")
    }
    //-----------------------------------------------------------
    try {
        await userModel.add("first","last", "e");
        t.ok(false,"should not pass")
    } catch (e) {
        t.ok(e,"throws an error when provided with [first_name,last_name,email]")
    }
    //-----------------------------------------------------------
    try {
        await userModel.add("first","last", "e","doctor");
        t.ok(false,"should not pass")
    } catch (e) {
        t.ok(e,"throws an error when provided with [first_name,last_name,email,doctorCertificate]")
    }
    //-----------------------------------------------------------


    t.end();

})

tape('test users.add() with invalid values', async (t) => {
    await dbBuild();
    //-----------------------------------------------------------
    try {
        await userModel.add("234","last","email","cer","pass");
        t.ok(false,"throws an error when provided with invalid [first_name] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with invalid [first_name] ")
    }
    //-----------------------------------------------------------
    try {
        await userModel.add("first","123","email","cer","pass");
        t.ok(false,"throws an error when provided with invalid [last_name]")
    } catch (e) {
        t.ok(e,"throws an error when provided with invalid [last_name]")
    }
    //-----------------------------------------------------------
    try {
        await userModel.add("first","last", "e","cer","pass");
        t.ok(false,"throws an error when provided with invalid [email]")
    } catch (e) {
        t.ok(e,"throws an error when provided with invalid [email]")
    }
    //-----------------------------------------------------------


    t.end();

})