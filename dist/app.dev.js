"use strict";

var express = require('express');

var app = express();

var jwt = require('jsonwebtoken');

var _require = require("./db"),
    db = _require.db;

var _require2 = require("sequelize"),
    QueryTypes = _require2.QueryTypes;

app.use(express.json());
app.listen(process.env.PORT || 3000, function () {
  return console.log('server started');
}); //users

app.get('/users', function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users", {
            type: QueryTypes.SELECT
          }));

        case 2:
          users = _context.sent;
          res.status(200).json(users);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});