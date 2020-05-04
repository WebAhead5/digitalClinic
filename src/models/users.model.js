const dbConnection = require('../database/db_connection');


//getAll
exports.getAll = async() => {


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
        return res.rows;

    } catch (e) {
        throw new Error("An error occured while retrieving users from the db")
    }

}


//getUserById

exports.getUserById = async (userId) => {

    try {
        let res = await dbConnection.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        return res.rows;
    } catch (e) {
        throw new Error("An error occured while retrieving the users from the db")
    }

}



//add(firstname, lastname, email, certificate)

exports.add = async (firstname, lastname, email, doctor_certificate) => {

        try {
            await dbConnection.query('INSERT INTO users (firstname, lastname, email, doctor_certificate) VALUES ($1,$2,$3,$4)', [firstname, lastname, email, doctor_certificate]);
            let res = await dbConnection.query('select * from sessions where email = $1', [email]);
            return res.rows[0];

        }
        catch (e) {
            throw new Error("An error occured while adding user to the database")
        }

}

