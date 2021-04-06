"use strict";

var express = require('express');

var app = express();

var jwt = require('jsonwebtoken');

app.use(express.json());
app.listen(process.env.PORT || 3000, function () {
  return console.log('server started');
});