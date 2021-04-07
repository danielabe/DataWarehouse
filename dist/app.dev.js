"use strict";

var express = require('express');

var app = express();

var helmet = require('helmet');

var jwt = require('jsonwebtoken');

var _require = require('./queries.js'),
    selectUserLogin = _require.selectUserLogin,
    getUsers = _require.getUsers,
    createUser = _require.createUser,
    getUser = _require.getUser;

var _require2 = require('./functions.js'),
    validateLogin = _require2.validateLogin,
    verifyToken = _require2.verifyToken,
    filterAdmin = _require2.filterAdmin,
    validateFirstname = _require2.validateFirstname,
    validateLastname = _require2.validateLastname,
    validateEmail = _require2.validateEmail,
    validatePassword = _require2.validatePassword,
    validateUser = _require2.validateUser,
    validateUserId = _require2.validateUserId;

app.use(express.json());
app.use(helmet());
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
app.use(verifyToken); //users

app.get('/users', filterAdmin, function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Función disponible sólo para admin, chequear
          getUsers(req, res); //si también debe estar disponible para otros usuarios

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post('/users/register', filterAdmin, validateFirstname, validateLastname, validateEmail, validatePassword, function _callee3(req, res) {
  var newUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
          };
          createUser(newUser, req, res);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/users/:userId', validateUser, validateUserId, function _callee4(req, res) {
  var userId;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = +req.params.userId;
          getUser(userId, req, res);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
});
/* express-rate-limit, .env, bcrypt
*/