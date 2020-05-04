const dbConnection = require('../database/db_connection');

function getAll() {
  return async () => {
    let res = await dbConnection.query('SELECT * FROM answers');
    return res.rows;
  };
}

function getFor(question_id) {
  return async () => {
    let res = await dbConnection.query(
      'SELECT * FROM answers WHERE question_id = $1',
      [question_id]
    );
    return res.rows;
  };
}

function add(user_id, question_id, context) {
  return async () => {
    return await dbConnection.query(
      `INSERT INTO answers VALUES ($1, $2 , '$3')`,
      [user_id, question_id, context]
    );
  };
}
