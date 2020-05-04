const dbConnection = require('../database/db_connection');
const fs = require('fs');


//getAll
exports.getAll = () => {
    new Promise((resolve, reject) =>
        dbConnection.query('SELECT * FROM users')
            .then((data) => {
                resolve('All data has been retrieved from the users table');
            })
            .catch((error) => {
                reject(new Error('An error occured while retrieving the data from the db'))
            }
            )
    );
}


//getDoctors

exports.getDoctors = () => {
    new Promise((resolve, reject) =>
        dbConnection.query('SELECT * FROM users WHERE doctor_certificate IS NOT NULL')
            .then((data) => {
                resolve('All Doctors names has been retrieved from the users table');
            })
            .catch((error) => {
                reject(new Error('An error occured while retrieving the doctors list from the db'))
            }
            )
    );
}






//getNonDoctors


exports.getNonDoctors = () => {
    new Promise((resolve, reject) =>
        dbConnection.query('SELECT * FROM users WHERE doctor_certificate IS NULL')
            .then((data) => {
                resolve('All patients names has been retrieved from the users table');
            })
            .catch((error) => {
                reject(new Error('An error occured while retrieving the Non doctors list from the db'))
            }
            )
    );
}


//getUserByEmail


exports.getUserByEmail = (email) => {
    new Promise((resolve, reject) =>
        dbConnection.query('SELECT * FROM users WHERE email = $1', [email])
            .then((data) => {
                resolve('All data has been retrieved from the users table');
            })
            .catch((error) => {
                reject(new Error('An error occured while retrieving the users list from the db'))
            }
            )
    );
}


//getUserById

exports.getUserById = (userId) => {
    new Promise((resolve, reject) =>
        dbConnection.query('SELECT * FROM users WHERE user_id = $1', [userId])
            .then((data) => {
                resolve('All data has been retrieved from the users table');
            })
            .catch((error) => {
                reject(new Error('An error occured while retrieving the users list from the db'))
            }
            )
    );
}



//add(firstname, lastname, email, certificate)

exports.addUser = (firstname, lastname, email, doctor_certificate) => {
    new Promise((resolve, reject) =>
        dbConnection.query('INSERT INTO users (firstname, lastname, email, doctor_certificate) VALUES ($1,$2,$3,$4)', [firstname, lastname, email, doctor_certificate])
            .then((data) => {
                resolve('A new user has been added to the users table');
            })
            .catch((error) => {
                reject(new Error('An error occured while adding the new user to the users table'))
            }
            )
    );
}