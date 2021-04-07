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

function getUsers(req, res) {
  var users;
  return regeneratorRuntime.async(function getUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT user_id, firstname, lastname, email, perfil FROM users\n    ", {
            type: QueryTypes.SELECT
          }));

        case 2:
          users = _context3.sent;
          res.status(200).json(users);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function createUser(newUser, req, res) {
  var inserted, firstname, lastname, email;
  return regeneratorRuntime.async(function createUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO users (firstname, lastname, email, password)\n    VALUES (:firstname, :lastname, :email, :password)\n    ", {
            replacements: newUser,
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context4.sent;
          console.log(inserted);
          firstname = newUser.firstname, lastname = newUser.lastname, email = newUser.email;
          res.status(201).json(Object.assign({}, {
            user_id: inserted[0]
          }, {
            firstname: firstname,
            lastname: lastname,
            email: email
          }, {
            perfil: "Básico"
          }));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function validateEmailQuery(req, res, next) {
  var email, emails, emailsArray;
  return regeneratorRuntime.async(function validateEmailQuery$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          email = req.body.email;
          _context5.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT email FROM users", {
            type: QueryTypes.SELECT
          }));

        case 3:
          emails = _context5.sent;
          emailsArray = emails.map(function (user) {
            return user.email;
          });

          if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
            if (emailsArray.every(function (e) {
              return e != email;
            })) next();else res.status(400).send("The email already exists").end();
          } else res.status(400).send("The email is wrong").end();

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function validateUserIdQuery(req, res, next) {
  var userId, users, usersArray;
  return regeneratorRuntime.async(function validateUserIdQuery$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          userId = +req.params.userId;
          _context6.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT user_id FROM users", {
            type: QueryTypes.SELECT
          }));

        case 3:
          users = _context6.sent;
          usersArray = users.map(function (id) {
            return id.user_id;
          });
          if (usersArray.includes(userId)) next();else res.status(404).send("The user does not exist").end();

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function getUser(userId, req, res) {
  var user;
  return regeneratorRuntime.async(function getUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT user_id, firstname, lastname, email, perfil FROM users WHERE user_id = ?\n    ", {
            replacements: [userId],
            type: QueryTypes.SELECT
          }));

        case 2:
          user = _context7.sent;
          res.status(200).json(user[0]);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function modifyUser(userId, req, res) {
  var user, password, newUser, modified;
  return regeneratorRuntime.async(function modifyUser$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users WHERE user_id = ?", {
            replacements: [userId],
            type: QueryTypes.SELECT
          }));

        case 2:
          user = _context8.sent;
          password = req.body.password || user[0].password;
          newUser = {
            user_id: userId,
            firstname: req.body.firstname || user[0].firstname,
            lastname: req.body.lastname || user[0].lastname,
            email: req.body.email || user[0].email,
            perfil: user[0].perfil
          };
          _context8.next = 7;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE users SET firstname = :firstname, lastname = :lastname, email = :email, \n    password = :password WHERE user_id = :user_id\n    ", {
            replacements: Object.assign({}, newUser, {
              password: password
            }),
            type: QueryTypes.UPDATE
          }));

        case 7:
          modified = _context8.sent;
          res.status(200).json(newUser);

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  });
}

module.exports = {
  selectUserLogin: selectUserLogin,
  validateLoginQuery: validateLoginQuery,
  getUsers: getUsers,
  createUser: createUser,
  validateEmailQuery: validateEmailQuery,
  validateUserIdQuery: validateUserIdQuery,
  getUser: getUser,
  modifyUser: modifyUser
};