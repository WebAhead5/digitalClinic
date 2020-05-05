const dbConnection = require('../database/db_connection');
const validator = require('./validator')

//getAll
exports.getAll = async () => {


    try {

        let res = await dbConnection.query('SELECT * FROM users');
        return res.rows;

    } catch (e) {
        throw new Error("An error occured while retrieving the doctors list from the db")
    }
}




//getDoctors

exports.getDoctors = async () => {

    try {
        let res = await dbConnection.query('SELECT * FROM users WHERE doctor_certificate IS NOT NULL');
        return res.rows;

    } catch (e) {
        throw new Error("An error occured while retrieving the doctors list from the db")
    }

}




//getNonDoctors


exports.getNonDoctors = async () => {


    try {

        let res = await dbConnection.query('SELECT * FROM users WHERE doctor_certificate IS NULL');
        return res.rows;

    } catch (e) {
        throw new Error("An error occured while retrieving the patients list from the db")
    }


}


//getUserByEmail


exports.getUserByEmail = async (email) => {
    try {
        let res = await dbConnection.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log('the res',res)
        if(res.rows.length == 0)
        return;
        return res.rows[0];

    } catch (e) {
        console.log(e.message)
        throw new Error("An error occured while retrieving users from the db")
    }

}


//getUserById

exports.getUserById = async (userId) => {

    try {
        let res = await dbConnection.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        return res.rows[0];
    } catch (e) {
        throw new Error("An error occured while retrieving the users from the db")
    }

}



//add(firstName, lastName, email, certificate)

exports.add = async (firstName, lastName, email, doctorCertificate, password) => {


    if (!validator.isLettersAndSpaces(firstName) || !validator.isLettersAndSpaces(lastName))
        throw new Error("First name and last name must be letters");


    if (!validator.validateEmail(email))
        throw new Error("please insert a valid email");


    // if (!validator.isEmptyString(firstName) || !validator.isEmptyString(lastName))
    //     throw new Error("Name cant be empty");

    try {
        console.log('this is the try', firstName, lastName, email,doctorCertificate);
        await dbConnection.query(`INSERT INTO users
        (first_name, last_name, email, doctor_certificate, password)
        VALUES ($1,$2,$3,$4, $5)`, [firstName, lastName, email, doctorCertificate, password]);
        let res = await dbConnection.query('select * from users where email = $1', [email]);
        return res.rows;
    }
    catch (e) {
        throw new Error("An error occured while adding user to the database")
    }

}


