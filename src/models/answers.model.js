const dbConnection = require('../database/db_connection');
const validator = require('./validator');
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
  if (validator.isEmptyString(context))
    throw new Error('message context cannot be empty');

  return  dbConnection.query(
      `INSERT INTO answers (user_id,question_id,answer_context) VALUES ($1, $2 , $3)`,
      [user_id, question_id, context]);

}

module.exports = {
  add,
  getAll,
  getFor,
};
