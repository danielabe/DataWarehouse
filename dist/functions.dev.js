"use strict";

var jwt = require('jsonwebtoken');

var authorizationPassword = 'tmo$Q$bG5xR56';

var _require = require('./queries.js'),
    validateLoginQuery = _require.validateLoginQuery,
    validateEmailQuery = _require.validateEmailQuery,
    validateUserIdQuery = _require.validateUserIdQuery,
    validateRegionNameQuery = _require.validateRegionNameQuery,
    validateRegionIdQuery = _require.validateRegionIdQuery,
    validateRegionNamePutQuery = _require.validateRegionNamePutQuery,
    validateCountryNameQuery = _require.validateCountryNameQuery; //users


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

function verifyToken(req, res, next) {
  var fullToken = req.headers.authorization || "0.0.0";
  var token = fullToken.split(' ')[1];

  try {
    jwt.verify(token, authorizationPassword);
    next();
  } catch (error) {
    res.status(401).send(error);
  }
}

function filterAdmin(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  var user = jwt.verify(token, authorizationPassword);

  if (user.perfil === "Admin") {
    next();
  } else {
    res.status(403).send("You do not have administrator permissions").end();
  }
}

function validateFirstname(req, res, next) {
  var firstname = req.body.firstname;
  if (firstname.length >= 3 && firstname.length <= 64) next();else res.status(400).send("The firstname length is wrong").end();
}

function validateLastname(req, res, next) {
  var lastname = req.body.lastname;
  if (lastname.length >= 2 && lastname.length <= 64) next();else res.status(400).send("The lastname length is wrong").end();
}

function validateEmail(req, res, next) {
  return regeneratorRuntime.async(function validateEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(validateEmailQuery(req, res, next));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function validatePassword(req, res, next) {
  var password = req.body.password;
  if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(password)) next();else res.status(400).send("The password is wrong").end();
} // Minimum 4 characters
// Maximum 15 characters
// At least 1 character
// At least 1 digit
// No blank spaces


function validateUser(req, res, next) {
  var userId = +req.params.userId;
  var token = jwt.verify(req.headers.authorization.split(' ')[1], authorizationPassword);
  if (token.user_id === userId || token.perfil === "Admin") next();else res.status(401).send("You do not have enough permissions").end();
}

function validateUserId(req, res, next) {
  return regeneratorRuntime.async(function validateUserId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(validateUserIdQuery(req, res, next));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function validateFirstnamePut(req, res, next) {
  if (req.body.firstname) {
    if (req.body.firstname.length >= 3 && req.body.firstname.length <= 64) next();else res.status(400).send("The firstname length is wrong").end();
  } else next();
}

function validateLastnamePut(req, res, next) {
  if (req.body.lastname) {
    if (req.body.lastname.length >= 2 && req.body.lastname.length <= 64) next();else res.status(400).send("The lastname length is wrong").end();
  } else next();
}

function validatePasswordPut(req, res, next) {
  if (req.body.password) {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(req.body.password)) next();else res.status(400).send("The password is wrong").end();
  } else next();
} //regions


function validateRegionName(req, res, next) {
  return regeneratorRuntime.async(function validateRegionName$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(validateRegionNameQuery(req, res, next));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function validateRegionId(req, res, next) {
  return regeneratorRuntime.async(function validateRegionId$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(validateRegionIdQuery(req, res, next));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function validateRegionNamePut(req, res, next) {
  return regeneratorRuntime.async(function validateRegionNamePut$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(validateRegionNamePutQuery(req, res, next));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
} //countries 


function validateCountryName(req, res, next) {
  return regeneratorRuntime.async(function validateCountryName$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(validateCountryNameQuery(req, res, next));

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
}

module.exports = {
  validateLogin: validateLogin,
  verifyToken: verifyToken,
  filterAdmin: filterAdmin,
  validateFirstname: validateFirstname,
  validateLastname: validateLastname,
  validateEmail: validateEmail,
  validatePassword: validatePassword,
  validateUser: validateUser,
  validateUserId: validateUserId,
  validateFirstnamePut: validateFirstnamePut,
  validateLastnamePut: validateLastnamePut,
  validatePasswordPut: validatePasswordPut,
  validateRegionName: validateRegionName,
  validateRegionId: validateRegionId,
  validateRegionNamePut: validateRegionNamePut,
  validateCountryName: validateCountryName
};