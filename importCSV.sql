\c sdc

\COPY answers FROM '/Users/norman/workspace/hrsf138/week8/SDC/qna-api/sdc_csv/answers_short.csv' DELIMITER ',' CSV HEADER;

\COPY answers_photos FROM '/Users/norman/workspace/hrsf138/week8/SDC/qna-api/sdc_csv/answers_photos_short.csv' DELIMITER ',' CSV HEADER;

\COPY questions FROM '/Users/norman/workspace/hrsf138/week8/SDC/qna-api/sdc_csv/questions_short.csv' DELIMITER ',' CSV HEADER;