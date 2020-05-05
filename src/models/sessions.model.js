const dbConnection = require('../database/db_connection');

//getall
exports.getAll = async () => {


    try {

        let res = await dbConnection.query(`SELECT users.user_id,users.first_name, users.last_name, users.email,users.doctor_certificate 
                                            FROM sessions inner join users on sessions.user_id = users.user_id; `);
        return res.rows;

    } catch (e) {
        throw new Error("An error occured while retrieving the session's data from the db")
    }
}


//getBySessionId
exports.getBySessionId = async (sessionId) => {

    if (typeof sessionId !== 'number')
        throw new Error("user id (getBySessionId) must be a number");


    try {
        let res = await dbConnection.query(`SELECT session_id,users.user_id,users.first_name, users.last_name, users.email,users.doctor_certificate 
                                            FROM sessions inner join users on sessions.user_id = users.user_id where session_id = $1 ; `, [sessionId]);

        return res.rows;

    } catch (e) {
        throw new Error("An error occurred while retrieving the session from the db")
    }
}



exports.add = async (userId, duration) => {

        // if (typeof userId !== 'number')
        //     throw new Error("user id (addSession model) must be a number");


        // if (typeof duration !== 'number')
        //     throw new Error("duration (addSession model) must be a number");


    try {

        await dbConnection.query('INSERT INTO sessions (user_id,duration_min) VALUES ($1,$2)', [userId, duration]);
        let res = await dbConnection.query(`SELECT session_id,users.user_id,users.first_name, users.last_name, users.email,users.doctor_certificate 
                                            FROM sessions inner join users on sessions.user_id = users.user_id where sessions.user_id = $1 ; `, [userId]);

        return res.rows[res.rows.length - 1];

    } catch (e) {
        throw new Error("An error occured while adding the session to the db")
    }
}



//delete(SessionID)
exports.delete = async (sessionId) => {

    if (typeof sessionId !== 'number')
        throw new Error("user id (delete) must be a number");



    try {

        let res = await dbConnection.query('DELETE FROM sessions WHERE session_id = $1', [sessionId]);
        return res.rowCount;

    } catch (e) {
        throw new Error("An error occured while deleting the session to the db")
    }


}


//deleteAllExpired()
exports.deleteAllExpired = async () => {

    try {
        let res = await dbConnection.query("DELETE FROM sessions WHERE start_time+(duration_min*INTERVAL'1 minutes')<=now()");
        return res.rowCount;
    } catch (e) {
        throw new Error("An error occured while deleting the session to the db")
    }
}



//isExpired(SessionID)
exports.isExpired = async (sessioniId) => {

    if (typeof sessionId !== 'number')
    throw new Error("user id (isExpired - session.model) must be a number");


    try {

        let res = await dbConnection.query("SELECT FROM sessions WHERE session_id=$1 & start_time+(duration_min*INTERVAL'1 minutes')<=now()", [sessioniId]);
        return res.rows.length === 0;

    } catch (e) {
        throw new Error("An error occured while deleting the session to the db")
    }
}
