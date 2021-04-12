"use strict";

var _require = require("sequelize"),
    QueryTypes = _require.QueryTypes;

var _require2 = require("./db"),
    db = _require2.db;

var jwt = require('jsonwebtoken');

var authorizationPassword = 'tmo$Q$bG5xR56'; //users

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

function deleteUser(userId, req, res) {
  var user, deleted, _user$, user_id, firstname, lastname, email, perfil;

  return regeneratorRuntime.async(function deleteUser$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users WHERE user_id = ?", {
            replacements: [userId],
            type: QueryTypes.SELECT
          }));

        case 2:
          user = _context9.sent;
          _context9.next = 5;
          return regeneratorRuntime.awrap(db.query("DELETE FROM users WHERE user_id = ?", {
            replacements: [userId],
            type: QueryTypes.DELETE
          }));

        case 5:
          deleted = _context9.sent;
          _user$ = user[0], user_id = _user$.user_id, firstname = _user$.firstname, lastname = _user$.lastname, email = _user$.email, perfil = _user$.perfil;
          res.status(200).json({
            user_id: user_id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            perfil: perfil
          });

        case 8:
        case "end":
          return _context9.stop();
      }
    }
  });
} //regions


function getRegions(req, res) {
  var regions;
  return regeneratorRuntime.async(function getRegions$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM regions", {
            type: QueryTypes.SELECT
          }));

        case 2:
          regions = _context10.sent;
          res.status(200).json(regions);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function validateRegionNameQuery(req, res, next) {
  var region, regions, regionsArray;
  return regeneratorRuntime.async(function validateRegionNameQuery$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          region = req.body.region_name;
          _context11.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT region_name FROM regions", {
            type: QueryTypes.SELECT
          }));

        case 3:
          regions = _context11.sent;
          regionsArray = regions.map(function (region) {
            return region.region_name;
          });

          if (req.body.region_name.length >= 2 && req.body.region_name.length <= 64) {
            if (regionsArray.every(function (name) {
              return name !== region;
            })) next();else res.status(400).send("The region already exists").end();
          } else res.status(400).send("The region name length is wrong").end();

        case 6:
        case "end":
          return _context11.stop();
      }
    }
  });
}

function createRegion(newRegion, req, res) {
  var inserted;
  return regeneratorRuntime.async(function createRegion$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          console.log(newRegion);
          _context12.next = 3;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO regions (region_name)\n    VALUES (:newRegion)\n    ", {
            replacements: {
              newRegion: newRegion
            },
            type: QueryTypes.INSERT
          }));

        case 3:
          inserted = _context12.sent;
          res.status(201).json(Object.assign({}, {
            region_id: inserted[0]
          }, {
            newRegion: newRegion
          }));

        case 5:
        case "end":
          return _context12.stop();
      }
    }
  });
}

function validateRegionIdQuery(req, res, next) {
  var regionId, regions, regionsArray;
  return regeneratorRuntime.async(function validateRegionIdQuery$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          regionId = +req.params.regionId || req.body.region_id;
          _context13.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT region_id FROM regions", {
            type: QueryTypes.SELECT
          }));

        case 3:
          regions = _context13.sent;
          regionsArray = regions.map(function (id) {
            return id.region_id;
          });
          if (regionsArray.includes(regionId)) next();else res.status(404).send("The region does not exist").end();

        case 6:
        case "end":
          return _context13.stop();
      }
    }
  });
}

function getRegion(regionId, req, res) {
  var region;
  return regeneratorRuntime.async(function getRegion$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM regions WHERE region_id = ?\n    ", {
            replacements: [regionId],
            type: QueryTypes.SELECT
          }));

        case 2:
          region = _context14.sent;
          res.status(200).json(region[0]);

        case 4:
        case "end":
          return _context14.stop();
      }
    }
  });
}

function validateRegionNamePutQuery(req, res, next) {
  var region, regions, regionsArray;
  return regeneratorRuntime.async(function validateRegionNamePutQuery$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          if (!req.body.region_name) {
            _context15.next = 9;
            break;
          }

          region = req.body.region_name;
          _context15.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT region_name FROM regions", {
            type: QueryTypes.SELECT
          }));

        case 4:
          regions = _context15.sent;
          regionsArray = regions.map(function (region) {
            return region.region_name;
          });

          if (req.body.region_name.length >= 2 && req.body.region_name.length <= 64) {
            if (regionsArray.every(function (name) {
              return name !== region;
            })) next();else res.status(400).send("The region already exists").end();
          } else res.status(400).send("The region name length is wrong").end();

          _context15.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context15.stop();
      }
    }
  });
}

function modifyRegion(regionId, req, res) {
  var region, newRegion, modified;
  return regeneratorRuntime.async(function modifyRegion$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM regions WHERE region_id = ?", {
            replacements: [regionId],
            type: QueryTypes.SELECT
          }));

        case 2:
          region = _context16.sent;
          newRegion = {
            regionId: regionId,
            regionName: req.body.region_name || region[0].region_name
          };
          _context16.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE regions SET region_name = :regionName WHERE region_id = :regionId\n    ", {
            replacements: newRegion
            /* Object.assign( {}, newRegion, {password: password} ) */
            ,
            type: QueryTypes.UPDATE
          }));

        case 6:
          modified = _context16.sent;
          res.status(200).json(newRegion);

        case 8:
        case "end":
          return _context16.stop();
      }
    }
  });
}

function deleteRegion(regionId, req, res) {
  var region, deleted;
  return regeneratorRuntime.async(function deleteRegion$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM regions WHERE region_id = ?", {
            replacements: [regionId],
            type: QueryTypes.SELECT
          }));

        case 2:
          region = _context17.sent;
          _context17.next = 5;
          return regeneratorRuntime.awrap(db.query("DELETE FROM regions WHERE region_id = ?", {
            replacements: [regionId],
            type: QueryTypes.DELETE
          }));

        case 5:
          deleted = _context17.sent;
          res.status(200).json(region);

        case 7:
        case "end":
          return _context17.stop();
      }
    }
  });
}

function getCountriesRegion(regionId, req, res) {
  var countries;
  return regeneratorRuntime.async(function getCountriesRegion$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM countries WHERE region_id = ?\n    ", {
            replacements: [regionId],
            type: QueryTypes.SELECT
          }));

        case 2:
          countries = _context18.sent;
          console.table(countries);
          res.status(200).json(countries);

        case 5:
        case "end":
          return _context18.stop();
      }
    }
  });
}

function getCitiesRegion(regionId, req, res) {
  var cities;
  return regeneratorRuntime.async(function getCitiesRegion$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT city_id, co.country_id, re.region_id, city_name \n    FROM cities ci\n    JOIN countries co ON co.country_id = ci.country_id \n    JOIN regions re ON re.region_id = co.region_id \n    WHERE re.region_id = ?\n    ", {
            replacements: [regionId],
            type: QueryTypes.SELECT
          }));

        case 2:
          cities = _context19.sent;
          console.table(cities);
          res.status(200).json(cities);

        case 5:
        case "end":
          return _context19.stop();
      }
    }
  });
} //countries


function getCountries(req, res) {
  var countries;
  return regeneratorRuntime.async(function getCountries$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 2:
          countries = _context20.sent;
          res.status(200).json(countries);

        case 4:
        case "end":
          return _context20.stop();
      }
    }
  });
}

function validateCountryNameQuery(req, res, next) {
  var country, countries, countriesArray;
  return regeneratorRuntime.async(function validateCountryNameQuery$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          country = req.body.country_name;
          _context21.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT country_name FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 3:
          countries = _context21.sent;
          countriesArray = countries.map(function (country) {
            return country.country_name;
          });

          if (req.body.country_name.length >= 2 && req.body.country_name.length <= 64) {
            if (countriesArray.every(function (name) {
              return name !== country;
            })) next();else res.status(400).send("The country already exists").end();
          } else res.status(400).send("The country name length is wrong").end();

        case 6:
        case "end":
          return _context21.stop();
      }
    }
  });
}

function createCountry(country_name, region_id, req, res) {
  var inserted;
  return regeneratorRuntime.async(function createCountry$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO countries (region_id, country_name)\n    VALUES (:region_id, :country_name)\n    ", {
            replacements: {
              country_name: country_name,
              region_id: region_id
            },
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context22.sent;
          res.status(201).json(Object.assign({}, {
            country_id: inserted[0],
            region_id: region_id,
            country_name: country_name
          }));

        case 4:
        case "end":
          return _context22.stop();
      }
    }
  });
}

function validateCountryIdQuery(req, res, next) {
  var countryId, countries, countriesArray;
  return regeneratorRuntime.async(function validateCountryIdQuery$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          countryId = +req.params.countryId || req.body.country_id;
          _context23.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT country_id FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 3:
          countries = _context23.sent;
          countriesArray = countries.map(function (id) {
            return id.country_id;
          });
          if (countriesArray.includes(countryId)) next();else res.status(404).send("The country does not exist").end();

        case 6:
        case "end":
          return _context23.stop();
      }
    }
  });
}

function getCountry(countryId, req, res) {
  var country;
  return regeneratorRuntime.async(function getCountry$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM countries WHERE country_id = ?\n    ", {
            replacements: [countryId],
            type: QueryTypes.SELECT
          }));

        case 2:
          country = _context24.sent;
          res.status(200).json(country[0]);

        case 4:
        case "end":
          return _context24.stop();
      }
    }
  });
}

function validateCountryNamePutQuery(req, res, next) {
  var country, countries, countriesArray;
  return regeneratorRuntime.async(function validateCountryNamePutQuery$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          if (!req.body.country_name) {
            _context25.next = 9;
            break;
          }

          country = req.body.country_name;
          _context25.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT country_name FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 4:
          countries = _context25.sent;
          countriesArray = countries.map(function (country) {
            return country.country_name;
          });

          if (req.body.country_name.length >= 2 && req.body.country_name.length <= 64) {
            if (countriesArray.every(function (name) {
              return name !== country;
            })) next();else res.status(400).send("The country already exists").end();
          } else res.status(400).send("The country name length is wrong").end();

          _context25.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context25.stop();
      }
    }
  });
}

function modifyCountry(countryId, req, res) {
  var country, newCountry, modified;
  return regeneratorRuntime.async(function modifyCountry$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM countries WHERE country_id = ?", {
            replacements: [countryId],
            type: QueryTypes.SELECT
          }));

        case 2:
          country = _context26.sent;
          newCountry = {
            country_id: countryId,
            region_id: req.body.region_id || country[0].region_id,
            country_name: req.body.country_name || country[0].country_name
          };
          _context26.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE countries SET country_name = :country_name, region_id = :region_id \n    WHERE country_id = :country_id\n    ", {
            replacements: newCountry,
            type: QueryTypes.UPDATE
          }));

        case 6:
          modified = _context26.sent;
          res.status(200).json(newCountry);

        case 8:
        case "end":
          return _context26.stop();
      }
    }
  });
}

function validateRegionIdCountryQuery(req, res, next) {
  var regionId, regions, regionsArray;
  return regeneratorRuntime.async(function validateRegionIdCountryQuery$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          if (!req.body.region_id) {
            _context27.next = 9;
            break;
          }

          regionId = req.body.region_id;
          _context27.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT region_id FROM regions", {
            type: QueryTypes.SELECT
          }));

        case 4:
          regions = _context27.sent;
          regionsArray = regions.map(function (id) {
            return id.region_id;
          });
          if (regionsArray.includes(regionId)) next();else res.status(404).send("The region does not exist").end();
          _context27.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context27.stop();
      }
    }
  });
}

function deleteCountry(countryId, req, res) {
  var country, deleted;
  return regeneratorRuntime.async(function deleteCountry$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM countries WHERE country_id = ?", {
            replacements: [countryId],
            type: QueryTypes.SELECT
          }));

        case 2:
          country = _context28.sent;
          _context28.next = 5;
          return regeneratorRuntime.awrap(db.query("DELETE FROM countries WHERE country_id = ?", {
            replacements: [countryId],
            type: QueryTypes.DELETE
          }));

        case 5:
          deleted = _context28.sent;
          res.status(200).json(country);

        case 7:
        case "end":
          return _context28.stop();
      }
    }
  });
}

function getCitiesCountry(countryId, req, res) {
  var cities;
  return regeneratorRuntime.async(function getCitiesCountry$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM cities WHERE country_id = ?\n    ", {
            replacements: [countryId],
            type: QueryTypes.SELECT
          }));

        case 2:
          cities = _context29.sent;
          console.table(cities);
          res.status(200).json(cities);

        case 5:
        case "end":
          return _context29.stop();
      }
    }
  });
} //cities


function getCities(req, res) {
  var cities;
  return regeneratorRuntime.async(function getCities$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM cities", {
            type: QueryTypes.SELECT
          }));

        case 2:
          cities = _context30.sent;
          res.status(200).json(cities);

        case 4:
        case "end":
          return _context30.stop();
      }
    }
  });
}

function validateCityNameQuery(req, res, next) {
  var city, cities, citiesArray;
  return regeneratorRuntime.async(function validateCityNameQuery$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          city = req.body.city_name;
          _context31.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT city_name FROM cities", {
            type: QueryTypes.SELECT
          }));

        case 3:
          cities = _context31.sent;
          citiesArray = cities.map(function (city) {
            return city.city_name;
          });

          if (req.body.city_name.length >= 2 && req.body.city_name.length <= 64) {
            if (citiesArray.every(function (name) {
              return name !== city;
            })) next();else res.status(400).send("The city already exists").end();
          } else res.status(400).send("The city name length is wrong").end();

        case 6:
        case "end":
          return _context31.stop();
      }
    }
  });
}

function createCity(country_id, city_name, req, res) {
  var inserted;
  return regeneratorRuntime.async(function createCity$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO cities (country_id, city_name)\n    VALUES (:country_id, :city_name)\n    ", {
            replacements: {
              country_id: country_id,
              city_name: city_name
            },
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context32.sent;
          res.status(201).json(Object.assign({}, {
            city_id: inserted[0],
            country_id: country_id,
            city_name: city_name
          }));

        case 4:
        case "end":
          return _context32.stop();
      }
    }
  });
}

function validateCityIdQuery(req, res, next) {
  var cityId, cities, citiesArray;
  return regeneratorRuntime.async(function validateCityIdQuery$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          cityId = +req.params.cityId || req.body.city_id;
          _context33.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT city_id FROM cities", {
            type: QueryTypes.SELECT
          }));

        case 3:
          cities = _context33.sent;
          citiesArray = cities.map(function (id) {
            return id.city_id;
          });
          if (citiesArray.includes(cityId)) next();else res.status(404).send("The city does not exist").end();

        case 6:
        case "end":
          return _context33.stop();
      }
    }
  });
}

function getCity(cityId, req, res) {
  var city;
  return regeneratorRuntime.async(function getCity$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM cities WHERE city_id = ?\n    ", {
            replacements: [cityId],
            type: QueryTypes.SELECT
          }));

        case 2:
          city = _context34.sent;
          res.status(200).json(city[0]);

        case 4:
        case "end":
          return _context34.stop();
      }
    }
  });
}

function validateCountryIdCityQuery(req, res, next) {
  var countryId, countries, countriesArray;
  return regeneratorRuntime.async(function validateCountryIdCityQuery$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          if (!req.body.country_id) {
            _context35.next = 9;
            break;
          }

          countryId = req.body.country_id;
          _context35.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT country_id FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 4:
          countries = _context35.sent;
          countriesArray = countries.map(function (id) {
            return id.country_id;
          });
          if (countriesArray.includes(countryId)) next();else res.status(404).send("The country does not exist").end();
          _context35.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context35.stop();
      }
    }
  });
}

function validateCityNamePutQuery(req, res, next) {
  var city, cities, citiesArray;
  return regeneratorRuntime.async(function validateCityNamePutQuery$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          if (!req.body.city_name) {
            _context36.next = 9;
            break;
          }

          city = req.body.city_name;
          _context36.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT city_name FROM cities", {
            type: QueryTypes.SELECT
          }));

        case 4:
          cities = _context36.sent;
          citiesArray = cities.map(function (city) {
            return city.city_name;
          });

          if (req.body.city_name.length >= 2 && req.body.city_name.length <= 64) {
            if (citiesArray.every(function (name) {
              return name !== city;
            })) next();else res.status(400).send("The city already exists").end();
          } else res.status(400).send("The city name length is wrong").end();

          _context36.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context36.stop();
      }
    }
  });
}

function modifyCity(cityId, req, res) {
  var city, newCity, modified;
  return regeneratorRuntime.async(function modifyCity$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          _context37.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM cities WHERE city_id = ?", {
            replacements: [cityId],
            type: QueryTypes.SELECT
          }));

        case 2:
          city = _context37.sent;
          newCity = {
            city_id: cityId,
            country_id: req.body.country_id || city[0].country_id,
            city_name: req.body.city_name || city[0].city_name
          };
          _context37.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE cities SET city_name = :city_name, country_id = :country_id \n    WHERE city_id = :city_id\n    ", {
            replacements: newCity,
            type: QueryTypes.UPDATE
          }));

        case 6:
          modified = _context37.sent;
          res.status(200).json(newCity);

        case 8:
        case "end":
          return _context37.stop();
      }
    }
  });
}

function deleteCity(cityId, req, res) {
  var city, deleted;
  return regeneratorRuntime.async(function deleteCity$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          _context38.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM cities WHERE city_id = ?", {
            replacements: [cityId],
            type: QueryTypes.SELECT
          }));

        case 2:
          city = _context38.sent;
          _context38.next = 5;
          return regeneratorRuntime.awrap(db.query("DELETE FROM cities WHERE city_id = ?", {
            replacements: [cityId],
            type: QueryTypes.DELETE
          }));

        case 5:
          deleted = _context38.sent;
          res.status(200).json(city);

        case 7:
        case "end":
          return _context38.stop();
      }
    }
  });
} //companies


function getCompanies(req, res) {
  var companies;
  return regeneratorRuntime.async(function getCompanies$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          _context39.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT company_id, company_name, c.city_id, city_name, ci.country_id, country_name, \n    co.region_id, region_name, address\n    FROM companies c\n    JOIN cities ci ON ci.city_id = c.city_id\n    JOIN countries co ON co.country_id = ci.country_id\n    JOIN regions re ON re.region_id = co.region_id\n    ", {
            type: QueryTypes.SELECT
          }));

        case 2:
          companies = _context39.sent;
          res.status(200).json(companies);

        case 4:
        case "end":
          return _context39.stop();
      }
    }
  });
}
/* SELECT city_id, co.country_id, re.region_id, city_name 
    FROM cities ci
    JOIN countries co ON co.country_id = ci.country_id 
    JOIN regions re ON re.region_id = co.region_id 
    WHERE re.region_id = ? */


module.exports = {
  selectUserLogin: selectUserLogin,
  validateLoginQuery: validateLoginQuery,
  getUsers: getUsers,
  createUser: createUser,
  validateEmailQuery: validateEmailQuery,
  validateUserIdQuery: validateUserIdQuery,
  getUser: getUser,
  modifyUser: modifyUser,
  deleteUser: deleteUser,
  getRegions: getRegions,
  createRegion: createRegion,
  validateRegionNameQuery: validateRegionNameQuery,
  validateRegionIdQuery: validateRegionIdQuery,
  getRegion: getRegion,
  validateRegionNamePutQuery: validateRegionNamePutQuery,
  modifyRegion: modifyRegion,
  deleteRegion: deleteRegion,
  getCountriesRegion: getCountriesRegion,
  getCitiesRegion: getCitiesRegion,
  getCountries: getCountries,
  validateCountryNameQuery: validateCountryNameQuery,
  createCountry: createCountry,
  validateCountryIdQuery: validateCountryIdQuery,
  getCountry: getCountry,
  validateCountryNamePutQuery: validateCountryNamePutQuery,
  modifyCountry: modifyCountry,
  validateRegionIdCountryQuery: validateRegionIdCountryQuery,
  deleteCountry: deleteCountry,
  getCitiesCountry: getCitiesCountry,
  getCities: getCities,
  validateCityNameQuery: validateCityNameQuery,
  createCity: createCity,
  validateCityIdQuery: validateCityIdQuery,
  getCity: getCity,
  validateCountryIdCityQuery: validateCountryIdCityQuery,
  validateCityNamePutQuery: validateCityNamePutQuery,
  modifyCity: modifyCity,
  deleteCity: deleteCity,
  getCompanies: getCompanies
};