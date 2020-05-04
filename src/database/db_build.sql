BEGIN;
--todo initialize database


-- CREATE DATABASE project_db;
-- CREATE USER super WITH SUPERUSER PASSWORD '123';
-- ALTER DATABASE project_db OWNER TO super;


DROP TABLE IF EXISTS users,questions, answers CASCADE;


CREATE TABLE users(
                       user_id SERIAL PRIMARY KEY,
                       first_name VARCHAR(100) NOT NULL,
                       last_name VARCHAR(100) NOT NULL,
                       email VARCHAR(100) NOT NULL,
                       password TEXT NOT NULL,
                       doctor_certificate VARCHAR(100) NOT NULL
);

CREATE TABLE questions(
                       id SERIAL PRIMARY KEY,
                       asker_id INTEGER,
                       FOREIGN KEY (asker_id) REFERENCES users (user_id),
                       question_context TEXT NOT NULL,
                       post_time TIMESTAMP NOT NULL
);


CREATE TABLE answers(
                       id SERIAL PRIMARY KEY,
                       question_id INTEGER,
                       FOREIGN KEY (question_id) REFERENCES questions (id),
                       answer_context TEXT NOT NULL,
                       post_time TIMESTAMP NOT NULL
);


CREATE TABLE sessions(
                       session_id SERIAL PRIMARY KEY,
                       user_id INTEGER,
                       FOREIGN KEY (user_id) REFERENCES users (user_id),
                       start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       duration_min INTEGER
);


--INSERT INTO sitters (name,starting_hour, end_hour, cost)
--VALUES
--       ('a', '7:00', '22:00', '50' ),
--       ('b', '7:00', '22:00', '50' ),
--       ('c', '7:00', '22:00', '50' ),
--       ('d', '7:00', '22:00', '50' ),
--       ('e', '7:00', '22:00', '50' ),
--       ('f', '7:00', '22:00', '50' );
--


COMMIT;
