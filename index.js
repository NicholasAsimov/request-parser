'use strict';

const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/api/whoami', (request, response) => {
  const ipaddress = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  // console.log(ip);

  response.end(JSON.stringify({
    ipaddress,
    language: request.headers['accept-language'].split(',')[0],
    software: request.headers['user-agent'],
  }));

});

app.listen(process.env.PORT || 3000, function() {
  /* eslint-disable no-console */
  console.log(`Server listening on port ${this.address().port}...`);
  /* eslint-enable no-console */
});
