const dbConnection = require('../database/db_connection');

//getall

exports.getAll = () => {
  new (async function () {
    try {
      let res = await dbConnection.query('SELECT * FROM sessions');
    } catch (e) {
      throw new Error(
        "An error occured while retrieving the session's data from the db"
      );
    }
    return res.rows;
  })();
};

//getBySessionId

exports.getBySessionId = (sessionid) => {
  new (async function () {
    try {
      let res = await dbConnection.query(
        'SELECT * FROM sessions where session_id = $1 ',
        [sessionid]
      );
    } catch (e) {
      throw new Error(
        'An error occured while retrieving the session from the db'
      );
    }
    return res.rows;
  })();
};

//add(userID,duration)

exports.addsession = (userid, duration) => {
  new (async function () {
    try {
      let res = await dbConnection.query(
        'INSERT INTO sessions (user_id,duration_min) VALUES ($1,$2)',
        [userid, duration]
      );
    } catch (e) {
      throw new Error('An error occured while adding the session to the db');
    }
    return res.rows;
  })();
};

//delete(SessionID)

exports.deletesession = (sessionid) => {
  new (async function () {
    try {
      let res = await dbConnection.query(
        'DELETE FROM sessions WHERE session_id = $1',
        [sessionid]
      );
    } catch (e) {
      throw new Error('An error occured while deleting the session to the db');
    }
    return res.rows;
  })();
};

//deleteAllExpired()

exports.deleteAllExpired = () => {
  new (async function () {
    try {
      let res = await dbConnection.query(
        "DELETE FROM sessions WHERE start_time+(duration_min*INTERVAL'1 minutes')<=now()"
      );
    } catch (e) {
      throw new Error('An error occured while deleting the session to the db');
    }
    return res.rows;
  })();
};

//isExpired(SessionID)

exports.isExpired = (sessionid) => {
  new (async function () {
    try {
      let res = await dbConnection.query(
        "SELECT FROM sessions WHERE session_id=$1 & start_time+(duration_min*INTERVAL'1 minutes')<=now()",
        [sessionid]
      );
    } catch (e) {
      throw new Error('An error occured while deleting the session to the db');
    }
    return res.rows.length === 0;
  })();
};
