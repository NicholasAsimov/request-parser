'use strict';

const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/api/whoami', (request, response) => {
  const ipaddress = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  const software = request.headers['user-agent'].match(/\((.*?)\)/)[1];

  response.end(JSON.stringify({
    ipaddress,
    language: request.headers['accept-language'].split(',')[0],
    software
  }));
});

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}...`);
});
