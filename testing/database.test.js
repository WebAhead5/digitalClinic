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
tape('test users.getUserByEmail(email) after adding the user', async (t) => {
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
tape('test users.getUserByEmail(email) of a non existing user', async (t) => {
    await dbBuild();
    try {
        let user = await userModel.getUserByEmail("cc");
        t.ok(!user, "returns undefined");
    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})
tape('test users.getUserById(id) after adding a user', async (t) => {
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
tape('test users.getUserById(id) of a non existing user', async (t) => {
    await dbBuild();
    try {
        let user = await userModel.getUserById(30);
        t.ok(!user, "returns undefined");
    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})
tape('test users.getUserById(id) of an incorrect format id', async (t) => {
    await dbBuild();
    try {
        await userModel.getUserById("abc");
        t.ok(false,"throws an error when provided incorrect param format provided")
    } catch (e) {
        t.ok(e,"throws an error")
    }

    t.end();

})
tape('test users.add(...) with missing params', async (t) => {
    await dbBuild();
    //-----------------------------------------------------------
    try {
        await userModel.add("a");
        t.ok(false,"throws an error when provided with only [first_name] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with [first_name] ")
    }
    //-----------------------------------------------------------
    try {
        await userModel.add("first","last");
        t.ok(false,"throws an error when provided with only [first_name,last_name] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with [first_name,last_name]")
    }
    //-----------------------------------------------------------
    try {
        await userModel.add("first","last", "e");
        t.ok(false,"throws an error when provided with only [first_name,last_name,email] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with [first_name,last_name,email]")
    }
    //-----------------------------------------------------------
    try {
        await userModel.add("first","last", "e","doctor");
        t.ok(false,"throws an error when provided with only [first_name,last_name,email,doctorCertificate] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with [first_name,last_name,email,doctorCertificate]")
    }
    //-----------------------------------------------------------


    t.end();

})
tape('test users.add(...) with invalid values', async (t) => {
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
tape('test users.add(...) with valid values', async (t) => {
    await dbBuild();
    try {
        await userModel.add("haha","last","email@email.com","cer","pass");
        t.ok(true," added successfully ")
    } catch (e) {
        t.ok(e," added successfully ")
    }

    t.end();

})


tape('test answers.getAll()', async (t) => {
    await dbBuild();

    try {
        let user = await answersModel.getAll();
        t.ok(Array.isArray(user), "returns an array");

    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})
tape('test answers.getFor(question_id) with valid params', async (t) => {
    await dbBuild();
    await dbConnection.query("insert into users (first_name, last_name, email, password, doctor_certificate) values('aa','bb','cc','123','')")
    await dbConnection.query("insert into questions (asker_id, question_context) values(0,'bal bla bla')")

    try {
        let question = await answersModel.getFor(0);
        t.ok(question, "returns the answers");
    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})
tape('test answers.getFor(question_id) with invalid param type', async (t) => {
    await dbBuild();

    try {
        let question = await answersModel.getFor("str");
        t.ok(!question, "should not pass");
    } catch (e) {
        t.ok(e,"throws an error")
    }

    t.end();

})
tape('test answers.add(...) with missing params', async (t) => {
    await dbBuild();
    //-----------------------------------------------------------
    try {
        await answersModel.add(12);
        t.ok(false,"throws an error when provided with only [user_id] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with [user_id] ")
    }
    //-----------------------------------------------------------
    try {
        await answersModel.add(123,"last");
        t.ok(false,"throws an error when provided with only [user_id, question_id] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with [user_id, question_id]")
    }
    //-----------------------------------------------------------

    t.end();

})
tape('test answers.add(...) with invalid params', async (t) => {
    await dbBuild();
    //-----------------------------------------------------------
    try {
        await answersModel.add("123", "123");
        t.ok(false,"throws an error when provided with invalid [user_id] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with invalid [user_id] ")
    }
    //-----------------------------------------------------------
    try {
        await answersModel.add(123,"    ");
        t.ok(false,"throws an error when provided with invalid [user_id, question_id] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with invalid [user_id, question_id]")
    }
    //-----------------------------------------------------------

    t.end();

})
tape('test answers.add(...) with valid values', async (t) => {
    await dbBuild();
    await dbConnection.query("insert into users (first_name, last_name, email, password, doctor_certificate) values('aa','bb','cc','123','true')")
    await dbConnection.query("insert into questions (asker_id, question_context) values(0,'a question')")

    try {
        await answersModel.add(0,0,"answer");
        t.ok(true," added successfully ")
    } catch (e) {
        t.ok(e," added successfully ")
    }

    t.end();

})


tape('test questions.getAll()', async (t) => {
    await dbBuild();

    try {
        let user = await questionsModel.getAll();
        t.ok(Array.isArray(user), "returns an array");

    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})
tape('test questions.getAskedBy(user_id) with valid params', async (t) => {
    await dbBuild();
    await dbConnection.query("insert into users (first_name, last_name, email, password, doctor_certificate) values('aa','bb','cc','123','')")
    await dbConnection.query("insert into questions (asker_id, question_context) values(0,'bal bla bla')")

    try {
        let question = await questionsModel.getAskedBy(0);
        t.ok(Array.isArray(question), "returns an array");
    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})
tape('test questions.getAskedBy(user_id) with invalid param type', async (t) => {
    await dbBuild();

    try {
        let question = await questionsModel.getAskedBy("str");
        t.ok(!question, "should not pass");
    } catch (e) {
        t.ok(e,"throws an error")
    }

    t.end();

})
tape('test questions.getById(question_id) with valid params', async (t) => {
    await dbBuild();
    await dbConnection.query("insert into users (first_name, last_name, email, password, doctor_certificate) values('aa','bb','cc','123','')")
    await dbConnection.query("insert into questions (asker_id, question_context) values(0,'bal bla bla')")

    try {
        let question = await questionsModel.getById(1);
        t.ok(question, "returns an object");
    } catch (e) {
        t.error(e,"no errors")
    }

    t.end();

})
tape('test questions.getById(question_id) with invalid param type', async (t) => {
    await dbBuild();

    try {
        let question = await questionsModel.getById("str");
        t.ok(!question, "should not pass");
    } catch (e) {
        t.ok(e,"throws an error")
    }

    t.end();

})
tape('test questions.getById(question_id) with non existent id', async (t) => {
    await dbBuild();

    try {
        let question = await questionsModel.getById(0);
        t.ok(!question, "should return undefined");
    } catch (e) {
        t.ok(e,"throws an error")
    }

    t.end();

})
tape('test questions.add(...) with missing params', async (t) => {
    await dbBuild();
    //-----------------------------------------------------------
    try {
        await questionsModel.add(12);
        t.ok(false,"throws an error when provided with only [user_id] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with [user_id] ")
    }
    //-----------------------------------------------------------

    t.end();

})
tape('test questions.add(...) with invalid params', async (t) => {
    await dbBuild();
    //-----------------------------------------------------------
    try {
        await questionsModel.add("0", "123");
        t.ok(false,"throws an error when provided with invalid [asker_id] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with invalid [user_id] ")
    }
    //-----------------------------------------------------------
    try {
        await questionsModel.add(0,"    ");
        t.ok(false,"throws an error when provided with invalid [asker_id, question_id] ")
    } catch (e) {
        t.ok(e,"throws an error when provided with invalid [user_id, question_id]")
    }
    //-----------------------------------------------------------

    t.end();

})
tape('test questions.add(...) with valid values', async (t) => {
    await dbBuild();
    await dbConnection.query("insert into users (first_name, last_name, email, password, doctor_certificate) values('aa','bb','cc','123','true')")
    await dbConnection.query("insert into questions (asker_id, question_context) values(0,'a question')")

    try {
        await questionsModel.add(0,"answer");
        t.ok(true," added successfully ")
    } catch (e) {
        t.ok(e," added successfully ")
    }

    t.end();

})
