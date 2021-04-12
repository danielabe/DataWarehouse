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
    createCountry = _require.createCountry,
    getCountry = _require.getCountry,
    modifyCountry = _require.modifyCountry,
    deleteCountry = _require.deleteCountry,
    getCitiesCountry = _require.getCitiesCountry,
    getCities = _require.getCities,
    createCity = _require.createCity,
    getCity = _require.getCity,
    modifyCity = _require.modifyCity,
    deleteCity = _require.deleteCity,
    getCompanies = _require.getCompanies,
    createCompany = _require.createCompany,
    getCompany = _require.getCompany;

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
    validateCountryName = _require2.validateCountryName,
    validateCountryId = _require2.validateCountryId,
    validateCountryNamePut = _require2.validateCountryNamePut,
    validateRegionIdCountry = _require2.validateRegionIdCountry,
    validateCityName = _require2.validateCityName,
    validateCityId = _require2.validateCityId,
    validateCountryIdCity = _require2.validateCountryIdCity,
    validateCityNamePut = _require2.validateCityNamePut,
    validateCompanyName = _require2.validateCompanyName,
    validateAddress = _require2.validateAddress,
    validateCompanyId = _require2.validateCompanyId;

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
          deleteRegion(regionId, req, res); //no puedo borrar una region si tengo países en ella o si borro una region 
          //borro todos los paises que tiene

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
app.get('/countries/:countryId', validateCountryId, function _callee16(req, res) {
  var countryId;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          countryId = +req.params.countryId;
          getCountry(countryId, req, res);

        case 2:
        case "end":
          return _context16.stop();
      }
    }
  });
});
app.put('/countries/:countryId', validateCountryId, validateRegionIdCountry, validateCountryNamePut, function _callee17(req, res) {
  var countryId;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          countryId = +req.params.countryId;
          modifyCountry(countryId, req, res);

        case 2:
        case "end":
          return _context17.stop();
      }
    }
  });
});
app["delete"]('/countries/:countryId', validateCountryId, function _callee18(req, res) {
  var countryId;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          countryId = +req.params.countryId;
          deleteCountry(countryId, req, res); //no puedo borrar un país si tengo ciudades en el o si borro un país 
          //borro todas las ciudades que tiene

        case 2:
        case "end":
          return _context18.stop();
      }
    }
  });
});
app.get('/countries/:countryId/cities', validateCountryId, function _callee19(req, res) {
  var countryId;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          countryId = +req.params.countryId;
          getCitiesCountry(countryId, req, res);

        case 2:
        case "end":
          return _context19.stop();
      }
    }
  });
}); //cities 

app.get('/cities', function _callee20(req, res) {
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          getCities(req, res);

        case 1:
        case "end":
          return _context20.stop();
      }
    }
  });
});
app.post('/cities', validateCityName, validateCountryId, function _callee21(req, res) {
  var _req$body3, country_id, city_name;

  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _req$body3 = req.body, country_id = _req$body3.country_id, city_name = _req$body3.city_name;
          createCity(country_id, city_name, req, res);

        case 2:
        case "end":
          return _context21.stop();
      }
    }
  });
});
app.get('/cities/:cityId', validateCityId, function _callee22(req, res) {
  var cityId;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          cityId = +req.params.cityId;
          getCity(cityId, req, res);

        case 2:
        case "end":
          return _context22.stop();
      }
    }
  });
});
app.put('/cities/:cityId', validateCityId, validateCountryIdCity, validateCityNamePut, function _callee23(req, res) {
  var cityId;
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          cityId = +req.params.cityId;
          modifyCity(cityId, req, res);

        case 2:
        case "end":
          return _context23.stop();
      }
    }
  });
});
app["delete"]('/cities/:cityId', validateCityId, function _callee24(req, res) {
  var cityId;
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          cityId = +req.params.cityId;
          deleteCity(cityId, req, res); //no puedo borrar una ciudad si tengo contactos o compañias en ella 
          //o borro todos los contactos o compañias que tiene

        case 2:
        case "end":
          return _context24.stop();
      }
    }
  });
}); //companies

app.get('/companies', function _callee25(req, res) {
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          getCompanies(req, res);

        case 1:
        case "end":
          return _context25.stop();
      }
    }
  });
});
app.post('/companies', validateCompanyName, validateCityId, validateAddress, function _callee26(req, res) {
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          newCompany = {
            company_name: req.body.company_name,
            city_id: req.body.city_id,
            address: req.body.address
          };
          createCompany(newCompany, req, res);

        case 2:
        case "end":
          return _context26.stop();
      }
    }
  });
});
app.get('/companies/:companyId', validateCompanyId, function _callee27(req, res) {
  var companyId;
  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          companyId = +req.params.companyId;
          getCompany(companyId, req, res);

        case 2:
        case "end":
          return _context27.stop();
      }
    }
  });
});
/* express-rate-limit, .env, bcrypt
*/