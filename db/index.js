const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'password',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successful connection to Postgres');
  }
});

module.exports = {

  getQuestions: (productId ,callback) => {
    const getQuestionsQuery = `
    SELECT
        Q.id as question_id,
        Q.body as question_body,
        Q.date_written as question_date,
        Q.asker_name as asker_name,
        Q.helpful as question_helpfulness,
        Q.reported as reported,
        (SELECT
            json_agg(
                json_build_object(
                    'question_id', A.question_id,
                    'body', A.body,
                    'answerer_name', A.answerer_name,
                    'photos', (SELECT
                                  json_agg(
                                      json_build_object('url', P.url)
                                  )
                              FROM answers_photos AS P
                              JOIN answers AS A
                              ON A.id = P.answer_id
                              AND A.question_id = Q.id
                              )
                )
            )
        FROM answers
        WHERE question_id=Q.id
        GROUP BY question_id
        ) AS answers
    FROM questions AS Q
    JOIN answers AS A
    ON Q.id = A.question_id
    AND Q.product_id = ${productId}
    GROUP BY Q.id;
    `;
    const startTime = Date.now();
    client
      .query(getQuestionsQuery)
      .then((res) => {
        const endTime = Date.now();
        console.log('This is the time in milliseconds:', endTime - startTime, 'ms');
        callback(null, res);
      })
      .catch((err) => {
        console.log('There is an error in the get', err);
        callback(err, 500);
      });
  },

  // getAnswers: () => {

  // }
};
