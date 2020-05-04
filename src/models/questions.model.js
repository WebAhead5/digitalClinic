const dbConnection = require('../database/db_connection');
const validator = require("./validator");

function getAll() {
  return async () => {
    let res = await dbConnection.query('SELECT * FROM questions');
    return res.rows;
  };
}

function getAskedBy(user_id) {
  return async () => {
    let res = await dbConnection.query(
      'SELECT * FROM questions WHERE user_id = $1',
      [user_id]
    );
    return res.rows;
  };
}

function add(user_id, context) {
  if (validator.isEmptyString(context))
    throw new Error('question context cannot be empty');

  return async () => {
    return await dbConnection.query(`INSERT INTO questions VALUES ($1,'$2')`, [
      user_id,
      context,
    ]);
  };
}

module.exports = {
  add,
  getAll,
  getAskedBy,
};
