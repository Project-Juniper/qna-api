
\c sdc;

DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers_photos CASCADE;
DROP TABLE IF EXISTS answers CASCADE;

create table answers_photos (
  id SERIAL NOT NULL,
  answer_id INTEGER NOT NULL,
  url VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

create table answers (
  id SERIAL NOT NULL,
  question_id INTEGER NOT NULL,
  body VARCHAR(1024) NULL DEFAULT NULL,
  date_written BIGINT,
  answerer_name VARCHAR(255) NULL DEFAULT NULL,
  answerer_email VARCHAR(255) NULL DEFAULT NULL,
  reported INTEGER,
  helpful INTEGER,
  PRIMARY KEY (id)
);

create table questions (
  id SERIAL NOT NULL,
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
