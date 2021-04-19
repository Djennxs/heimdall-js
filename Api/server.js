/**
 * 
 * Webserv code for receiving requests from the Interface
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Set Headers
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Controllers
const { Join } = require('./Controllers/Tests/Join');

app.get('/bot-status', (req, res, next) => {
  res.send({
    status: 'online'
  });
});

app.post('/test/welcome', (req, res, next) => {
  Join({ req, res, next });
});

app.listen(8008);
console.log('Heimdall API server running!');