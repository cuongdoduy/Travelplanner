const express = require('express');
const app = express();
app.use(express.static('dist'));
app.get('/', function (req, res) {
  res.status(200).send('ok');
  res.sendFile('index'); 
})
module.exports = app;