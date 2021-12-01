const express = require('express');
const axios = require('axios');
const { qaURL } = require('../apiconfig.js');
const { GH_TOKEN } = require('../../tokens.js');
const db = require('../../db/index');

const HEADERS = { headers: { Authorization: GH_TOKEN } };

const router = express.Router();

router.get('/:question_id/answers', (req, res) => {
  const url = `${qaURL}/qa/questions/${req.params.question_id}/answers`;

  axios
    .get(url, HEADERS)
    .then((response) => {
      const { results } = response.data;
      res.status(response.status).send(results);
    })
    .catch((err) => {
      res.status(err.response.status).send(err.response.data);
    });
});

router.post('/questions', (req, res) => {
  const { body } = req;
  const url = `${qaURL}/qa/questions`;

  axios
    .post(url, body, HEADERS)
    .then((response) => {
      res.status(response.status).send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post('/:question_id/answers', (req, res) => {
  const { body } = req;
  // eslint-disable-next-line camelcase
  const url = `${qaURL}/qa/questions/${req.params.question_id}/answers`;

  axios
    .post(url, body, HEADERS)
    .then((response) => {
      res.status(response.status).send(response.data);
    })
    .catch((error) => {
      res.status(error).send(error);
    });
});

router.put('/questions/:question_id/helpful', (req, res) => {
  const url = `${qaURL}/qa/questions/${req.params.question_id}/helpful`;
  axios
    .put(url, null, HEADERS)
    .then((response) => {
      res.status(response.status).send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.put('/answers/:answer_id/helpful', (req, res) => {
  const url = `${qaURL}/qa/answers/${req.params.answer_id}/helpful`;

  axios
    .put(url, {}, HEADERS)
    .then(({ status, body }) => {
      res.status(status).send(body);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.put('/questions/:question_id/report', (req, res) => {
  const url = `${qaURL}/qa/questions/${req.params.question_id}/report`;

  axios
    .put(url, null, HEADERS)
    .then((response) => {
      res.status(response.status).send(response);
    })
    .catch((error) => {
      res.status(error.status).send(error);
    });
});

router.put('/answers/:answer_id/report', (req, res) => {
  const url = `${qaURL}/qa/answers/${req.params.answer_id}/report`;

  axios
    .put(url, null, HEADERS)
    .then((response) => {
      res.status(204).send(response);
    })
    .catch((error) => {
      res.status(204).send(error);
    });
});

router.get('/questions/:id', (req, res) => {
  const { id } = req.params;
  const { count } = req.query;
  // const url = `${URL}/qa/questions/?product_id=${id}`;
  // const headers = { params: { count }, ...HEADERS };
  const productId = id.split('&')[0];

  console.log('## GET /qa/questions/:id - ', id, ' -> ', productId);

  const queryStr = `
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

  db.query(queryStr, (err, queryResults) => {
    if (err) {
      console.log('@@ err in /qa/questions/:id -', err);
    } else {
      console.log('Successful query! result is here ', queryResults.rows);
      const myResults = { product_id: productId, results: queryResults.rows };
      res.send(myResults);
    }
  });
});

module.exports = router;
