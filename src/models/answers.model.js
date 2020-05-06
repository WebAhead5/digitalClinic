const dbConnection = require('../database/db_connection');
const validator = require('./validator');

async function getAll() {

    let res = await dbConnection.query('SELECT * FROM answers');
    return res.rows;
  };


async function getFor(question_id) {

    let res = await dbConnection.query(
        `SELECT id,
               post_time, 
              (EXTRACT(EPOCH FROM post_time) * 1000) as post_time_milliseconds,
              answers.user_id,
              users.first_name as asker_first_name,
              users.last_name as asker_last_name,
              users.doctor_certificate
       FROM answers
       inner join users on answers.user_id = users.user_id 
       WHERE question_id = $1`,
        [question_id]
    );
    return res.rows;

}

async function add(user_id, question_id, context) {

  if (validator.isEmptyString(context))
    throw new Error('message context cannot be empty');

   await  dbConnection.query(
      `INSERT INTO answers (user_id,question_id,answer_context) VALUES ($1, $2 , $3)`,
      [user_id, question_id, context]);


}

module.exports = {
  add,
  getAll,
  getFor,
};
