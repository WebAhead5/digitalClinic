const dbConnection = require('../database/db_connection');
const validator = require("./validator");

async function getAll() {

  let res = await dbConnection.query(`SELECT id,
                                            question_context as context,
                                            post_time, 
                                            (EXTRACT(EPOCH FROM post_time) * 1000) as post_time_milliseconds,
                                            asker_id,
                                            users.first_name,
                                            users.last_name ,
                                            users.doctor_certificate
                                            FROM questions
                                            inner join users on asker_id = users.user_id`);
  return res.rows;
}


async function getAskedBy(user_id) {

    let res = await dbConnection.query(
      `SELECT id,
              question_context as context,
              post_time, 
              (EXTRACT(EPOCH FROM post_time) * 1000) as post_time_milliseconds,
              asker_id,
              users.first_name,
              users.last_name,
              users.doctor_certificate
       FROM questions
       inner join users on asker_id = users.user_id 
       WHERE asker_id = $1`,
      [user_id]
    );
    return res.rows;

}

async function getById(question_id) {

    let res = await dbConnection.query(
        `SELECT id,
              question_context as context,
              post_time, 
              (EXTRACT(EPOCH FROM post_time) * 1000) as post_time_milliseconds,
              asker_id,
              users.first_name,
              users.last_name,
              users.doctor_certificate
       FROM questions
       inner join users on asker_id = users.user_id 
       WHERE id = $1`,
        [question_id]
    );
    return res.rows.length? res.rows[0]: undefined;

}


async function add(asker_id, context) {
  if (validator.isEmptyString(context))
    throw new Error('question context cannot be empty');

   await  dbConnection.query(`INSERT INTO questions (asker_id,question_context) VALUES ($1,$2)`, [
      asker_id,
      context,
    ]);

    let qobj = await dbConnection.query(`SELECT * FROM questions where asker_id = $1 and
     question_context =$2`,[asker_id,context])
     return qobj.rows[qobj.rows.length-1]


}

module.exports = {
  add,
  getAll,
  getAskedBy,
    getById
};
