"use strict";

var jwt = require('jsonwebtoken');

var authorizationPassword = 'tmo$Q$bG5xR56';

var _require = require('./queries.js'),
    validateLoginQuery = _require.validateLoginQuery;

function validateLogin(req, res, next) {
  return regeneratorRuntime.async(function validateLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(validateLoginQuery(req, res, next));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  validateLogin: validateLogin
};