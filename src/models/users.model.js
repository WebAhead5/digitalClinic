const dbConnection = require('../database/db_connection');


//getAll
exports.getAll = () => {

    new async function () {
        try {

            let res = await dbConnection.query('SELECT * FROM users');
        }
        catch (e) {
            throw new Error("An error occured while retrieving the doctors list from the db")
        }
        return res.rows;
    }

}


//getDoctors

exports.getDoctors = () => {


    return async () => {
        try {

            let res = await dbConnection.query('SELECT * FROM users WHERE doctor_certificate IS NOT NULL');
        }
        catch (e) {
            throw new Error("An error occured while retrieving the doctors list from the db")
        }
        return res.rows;
    }

}


//getNonDoctors


exports.getNonDoctors = () => {

    return async () => {
        try {

            let res = await dbConnection.query('SELECT * FROM users WHERE doctor_certificate IS NULL');
        }
        catch (e) {
            throw new Error("An error occured while retrieving the patients list from the db")
        }
        return res.rows;
    }



}


//getUserByEmail


exports.getUserByEmail = (email) => {

    return async () => {
        try {
            let res = await dbConnection.query('SELECT * FROM users WHERE email = $1', [email]);
            return res.rows.length?res.rows[0]:undefined;
       
        }
        catch (e) {
            throw new Error("An error occured while retrieving users from the db")
        }
    }

}


//getUserById

exports.getUserById = (userId) => {
    return async () => {
        try {
            let res = await dbConnection.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        }
        catch (e) {
            throw new Error("An error occured while retrieving the users from the db")
        }
        return res.rows;
    }
}



//add(firstname, lastname, email, certificate)

exports.addUser = (firstname, lastname, email, doctor_certificate) => {
    return async () => {
        try {
            let res = await dbConnection.query('INSERT INTO users (firstname, lastname, email, doctor_certificate) VALUES ($1,$2,$3,$4)', [firstname, lastname, email, doctor_certificate]);
        }
        catch (e) {
            throw new Error("An error occured while adding user to the database")
        }
        return res.rows;
    }
}

