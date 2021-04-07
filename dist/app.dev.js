"use strict";

var express = require('express');

var app = express();

var jwt = require('jsonwebtoken');

var _require = require('./queries.js'),
    selectUserLogin = _require.selectUserLogin;

var _require2 = require('./functions.js'),
    validateLogin = _require2.validateLogin;

app.use(express.json());
app.listen(process.env.PORT || 3000, function () {
  return console.log('server started');
}); //login

app.post('/users/login', validateLogin, function _callee(req, res) {
  var _req$body, username, password;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          selectUserLogin(username, password, req, res);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});