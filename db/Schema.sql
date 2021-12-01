DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers_photos CASCADE;
DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers_photos (
  id serial NOT NULL, 
  answer_id INTEGER NOT NULL, 
  url VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE answers (
  id serial NOT NULL,
  question_id INTEGER NOT NULL,
  body VARCHAR(1024) NULL DEFAULT NULL,
  date_written BIGINT,
  answerer_name VARCHAR(255) NULL DEFAULT NULL,
  answerer_email VARCHAR(255) NULL DEFAULT NULL,
  reported INTEGER,
  helpful INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE questions (
  id serial NOT NULL,
  product_id INTEGER NOT NULL,
  body VARCHAR(1024) NULL DEFAULT NULL,
  date_written BIGINT,
  asker_name VARCHAR(255) NULL DEFAULT NULL,
  asker_email VARCHAR(255) NULL DEFAULT NULL,
  reported INTEGER,
  helpful INTEGER,
  PRIMARY KEY (id)
);

CREATE index ON "answers_photos" ("answer_id");
CREATE index ON "answers" ("question_id");
CREATE index ON "questions" ("product_id");
