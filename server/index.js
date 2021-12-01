const express = require('express');
const axios = require('axios');
const cors = require('cors');
// const { GH_TOKEN } = require('../tokens.js');
// const { outfitData } = require('./clientOutfit.js');
const db = require('../db/index.js');

const app = express();
const PORT = 3000 || process.env.PORT;
// const PORT = 8080 || process.env.PORT;
// const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';
// const HEADERS = { headers: { Authorization: GH_TOKEN } };

// app.use(express.static('../../Loungeo/client'));
app.use(express.json());
app.use(cors());

// const customerOutfit = outfitData;


// // Questions Service
// const questionsRoutes = require('./questions/routes.js');

// app.use('/qa', questionsRoutes);

app.get('/questions/:id', (req, res) => {
  const { id } = req.params;
  const { count } = req.query;
  // const url = `${URL}/qa/questions/?product_id=${id}`;
  // const headers = { params: { count }, ...HEADERS };
  const productId = id.split('&')[0];

  console.log('## GET /qa/questions/:id - ', id, ' -> ', productId);

  db.getQuestions( productId, (err, queryResults) => {
    if (err) {
      console.log('@@ err in /qa/questions/:id -', err);
    } else {
      console.log('Successful query! result is here ', queryResults.rows);
      const myResults = { product_id: productId, results: queryResults.rows };
      res.send(myResults);
    }
  });
});


app.put('/questions/:question_id/helpful', (req, res) => {
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

app.post('/:question_id/answers', (req, res) => {
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

app.post('/questions', (req, res) => {
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

app.get('/:question_id/answers', (req, res) => {
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



app.listen(PORT, () => {
  console.log('Server listening on port:', `${PORT}`);
});
