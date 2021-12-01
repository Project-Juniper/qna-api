const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: '',
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
  query: (queryStr, callback) => {
    const startTime = Date.now();
    client
      .query(queryStr)
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
};
