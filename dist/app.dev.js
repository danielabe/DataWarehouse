"use strict";

var express = require('express');

var app = express();

var helmet = require('helmet');

var jwt = require('jsonwebtoken');

var _require = require('./queries.js'),
    selectUserLogin = _require.selectUserLogin,
    getUsers = _require.getUsers,
    createUser = _require.createUser,
    getUser = _require.getUser,
    modifyUser = _require.modifyUser,
    deleteUser = _require.deleteUser,
    getRegions = _require.getRegions,
    createRegion = _require.createRegion,
    getRegion = _require.getRegion,
    modifyRegion = _require.modifyRegion,
    deleteRegion = _require.deleteRegion,
    getCountriesRegion = _require.getCountriesRegion,
    getCitiesRegion = _require.getCitiesRegion,
    getCountries = _require.getCountries,
    createCountry = _require.createCountry;

var _require2 = require('./functions.js'),
    validateLogin = _require2.validateLogin,
    verifyToken = _require2.verifyToken,
    filterAdmin = _require2.filterAdmin,
    validateFirstname = _require2.validateFirstname,
    validateLastname = _require2.validateLastname,
    validateEmail = _require2.validateEmail,
    validatePassword = _require2.validatePassword,
    validateUser = _require2.validateUser,
    validateUserId = _require2.validateUserId,
    validateFirstnamePut = _require2.validateFirstnamePut,
    validateLastnamePut = _require2.validateLastnamePut,
    validatePasswordPut = _require2.validatePasswordPut,
    validateRegionName = _require2.validateRegionName,
    validateRegionId = _require2.validateRegionId,
    validateRegionNamePut = _require2.validateRegionNamePut,
    validateCountryName = _require2.validateCountryName;

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
app.put('/users/:userId', validateUser, validateUserId, validateFirstnamePut, validateLastnamePut, validatePasswordPut, function _callee5(req, res) {
  var userId;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = +req.params.userId;
          modifyUser(userId, req, res);

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app["delete"]('/users/:userId', validateUser, validateUserId, function _callee6(req, res) {
  var userId;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          userId = +req.params.userId;
          deleteUser(userId, req, res);

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //regions

app.get('/regions', function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          getRegions(req, res);

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.post('/regions', validateRegionName, function _callee8(req, res) {
  var newRegion;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          newRegion = req.body.region_name;
          createRegion(newRegion, req, res);

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.get('/regions/:regionId', validateRegionId, function _callee9(req, res) {
  var regionId;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          regionId = +req.params.regionId;
          getRegion(regionId, req, res);

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.put('/regions/:regionId', validateRegionId, validateRegionNamePut, function _callee10(req, res) {
  var regionId;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          regionId = +req.params.regionId;
          modifyRegion(regionId, req, res);

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app["delete"]('/regions/:regionId', validateRegionId, function _callee11(req, res) {
  var regionId;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          regionId = +req.params.regionId;
          deleteRegion(regionId, req, res);

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app.get('/regions/:regionId/countries', validateRegionId, function _callee12(req, res) {
  var regionId;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          regionId = +req.params.regionId;
          getCountriesRegion(regionId, req, res);

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.get('/regions/:regionId/cities', validateRegionId, function _callee13(req, res) {
  var regionId;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          regionId = +req.params.regionId;
          getCitiesRegion(regionId, req, res);

        case 2:
        case "end":
          return _context13.stop();
      }
    }
  });
}); //countries

app.get('/countries', function _callee14(req, res) {
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          getCountries(req, res);

        case 1:
        case "end":
          return _context14.stop();
      }
    }
  });
});
app.post('/countries', validateCountryName, validateRegionId, function _callee15(req, res) {
  var _req$body2, region_id, country_name;

  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _req$body2 = req.body, region_id = _req$body2.region_id, country_name = _req$body2.country_name;
          createCountry(country_name, region_id, req, res);

        case 2:
        case "end":
          return _context15.stop();
      }
    }
  });
});
/* express-rate-limit, .env, bcrypt
*/