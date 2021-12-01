
\c sdc; /* connect to db 'sdc' */

\COPY answers FROM '/Users/norman/projects/SDC/Loungeo/csv_files/answers.csv' DELIMITER ',' CSV HEADER;

\COPY answers_photos FROM '/Users/norman/projects/SDC/Loungeo/csv_files/answers_photos.csv' DELIMITER ',' CSV HEADER;

\COPY questions FROM '/Users/norman/projects/SDC/Loungeo/csv_files/questions.csv' DELIMITER ',' CSV HEADER;
