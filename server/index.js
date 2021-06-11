const express = require('express');
const config = require('./../config.json');

// Declare express app
const app = express();

app.get('/', (req, res, next) => {
  res.send('Node server running.');
});

// Start up app
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});