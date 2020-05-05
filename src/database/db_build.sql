BEGIN;
--todo initialize database


-- CREATE DATABASE project_db;
-- CREATE USER super WITH SUPERUSER PASSWORD '123';
-- ALTER DATABASE project_db OWNER TO super;



DROP TABLE IF EXISTS users,questions, answers, sessions CASCADE;



CREATE TABLE users(
                       user_id SERIAL PRIMARY KEY,
                       first_name VARCHAR(100) NOT NULL,
                       last_name VARCHAR(100) NOT NULL,
                       email VARCHAR(100) unique NOT NULL ,
                       password TEXT NOT NULL,
                       doctor_certificate VARCHAR(100)
);

CREATE TABLE questions(
                       id SERIAL PRIMARY KEY,
                       asker_id INTEGER NOT NULL,
                    -- FOREIGN KEY (asker_id) REFERENCES users (user_id),
                       question_context TEXT NOT NULL,
                       post_time timestamp with time zone DEFAULT NOW()
);


CREATE TABLE answers(
                        id SERIAL PRIMARY KEY,
                        user_id INTEGER NOT NULL,
                        question_id INTEGER NOT NULL,
                  --    FOREIGN KEY (user_id) REFERENCES users (user_id),
                  --    FOREIGN KEY (question_id) REFERENCES questions (id),
                        answer_context TEXT NOT NULL,
                        post_time timestamp with time zone default now()
);


CREATE TABLE sessions(
                       session_id SERIAL PRIMARY KEY,
                       user_id INTEGER NOT NULL,
                       -- FOREIGN KEY (user_id) REFERENCES users (user_id),
                       start_time timestamp with time zone DEFAULT NOW(),
                       duration_min INTEGER
);


INSERT INTO users (first_name,last_name, email, password, doctor_certificate)
VALUES
      ('Hashem', 'Jawad', 'hashem@gmail.com', 'hashem$F2', 'ID93849' ),
      ('Morad', 'Abed', 'morad@gmail.com', 'morad$F2', NULL),
      ('mehiar', 'sammar', 'mehiar@gmail.com', 'mehiar$F2', 'ID64823' ),
      ('Moris', 'Rafoul', 'moris@gmail.com', 'mori$F2', 'ID64823' );


INSERT INTO questions (asker_id, question_context, post_time)
VALUES
      (2, 'why do i have headache?', '2020-01-01 10:10:10');


COMMIT;
