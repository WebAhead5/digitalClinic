const dbConnection = require('../database/db_connection');
const validator = require("./validator");

async function getAll() {

  let res = await dbConnection.query(`SELECT id,
                                            question_context,
                                            post_time, 
                                            (EXTRACT(EPOCH FROM post_time) * 1000) as post_time_milliseconds,
                                            asker_id,
                                            users.first_name as asker_first_name,
                                            users.last_name as asker_last_name                      
                                            FROM questions
                                            inner join users on asker_id = users.user_id`);
  return res.rows;
}


async function getAskedBy(user_id) {

  if (!Number.isInteger(user_id))
    throw new Error("user id (getAskedBy)must be a number");


  let res = await dbConnection.query(
    `SELECT id,
              question_context,
              post_time, 
              (EXTRACT(EPOCH FROM post_time) * 1000) as post_time_milliseconds,
              asker_id,
              users.first_name as asker_first_name,
              users.last_name as asker_last_name                      
       FROM questions
       inner join users on asker_id = users.user_id 
       WHERE asker_id = $1`,
    [user_id]
  );
  return res.rows;

}

async function add(asker_id, context) {

  if (!Number.isInteger(asker_id))
  throw new Error("user id (addFunc) must be a number");
 
  if (!context)
  throw new Error("context (addFunc) cant be empty");




  if (validator.isEmptyString(context))
    throw new Error('question context cannot be empty');

  await dbConnection.query(`INSERT INTO questions (asker_id,question_context) VALUES ($1,$2)`, [
    asker_id,
    context,
  ]);


}

module.exports = {
  add,
  getAll,
  getAskedBy,
};
