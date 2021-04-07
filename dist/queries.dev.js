"use strict";

var _require = require("sequelize"),
    QueryTypes = _require.QueryTypes;

var _require2 = require("./db"),
    db = _require2.db;

var jwt = require('jsonwebtoken');

var authorizationPassword = 'tmo$Q$bG5xR56';

function selectUserLogin(username, password, req, res) {
  var user, perfil, user_id;
  return regeneratorRuntime.async(function selectUserLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users WHERE email = :username && password = :password", {
            replacements: {
              username: username,
              password: password
            },
            type: QueryTypes.SELECT
          }));

        case 2:
          user = _context.sent;
          perfil = user[0].perfil;
          user_id = user[0].user_id;
          res.status(200).json(jwt.sign({
            username: username,
            perfil: perfil,
            user_id: user_id
          }, authorizationPassword));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function validateLoginQuery(req, res, next) {
  var _req$body, username, password, user;

  return regeneratorRuntime.async(function validateLoginQuery$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users WHERE email = :username && password = :password", {
            replacements: {
              username: username,
              password: password
            },
            type: QueryTypes.SELECT
          }));

        case 3:
          user = _context2.sent;
          if (user[0]) next();else res.status(400).send("Invalid credentials").end();

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  selectUserLogin: selectUserLogin,
  validateLoginQuery: validateLoginQuery
};