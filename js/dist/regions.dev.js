"use strict";

var regionList = document.getElementById('regionList');
var addRegBtn = document.getElementById('addRegBtn');
var locContainer = document.getElementById('locContainer');
var body = document.querySelector('body');
var darkImage = document.getElementById('darkImage');
var newRegion = document.getElementById('newRegion');
var saveRegion = document.getElementById('saveRegion');
var cancelRegion = document.getElementById('cancelRegion');
var newRegForm = document.getElementById('newRegForm');
var msgContainer = document.getElementById('msgContainer');
var closeNewRegion = document.getElementById('closeNewRegion');
var msgNReg = document.getElementById('msgNReg');
var darkImageRegions = document.getElementById('darkImageRegions');
var cancelDltRegBtn = document.getElementById('cancelDltRegBtn');
var deleteRegBtn = document.getElementById('deleteRegBtn');
var darkImageEditReg = document.getElementById('darkImageEditReg');
var regionEdit = document.getElementById('regionEdit');
var closeEditRegion = document.getElementById('closeEditRegion');
var deleteRegEdit = document.getElementById('deleteRegEdit');
var msgEReg = document.getElementById('msgEReg');
var darkImageNewCountry = document.getElementById('darkImageNewCountry');
var closeNewCountry = document.getElementById('closeNewCountry');
var cancelCountry = document.getElementById('cancelCountry');
var newCountry = document.getElementById('newCountry');
var msgNCount = document.getElementById('msgNCount');
var saveCountry = document.getElementById('saveCountry');
var darkImageCountries = document.getElementById('darkImageCountries');
var cancelDltCountBtn = document.getElementById('cancelDltCountBtn');
var darkImageEditCount = document.getElementById('darkImageEditCount');
var deleteCountBtn = document.getElementById('deleteCountBtn');
var closeEditCountry = document.getElementById('closeEditCountry');
var countryEdit = document.getElementById('countryEdit');
var msgECount = document.getElementById('msgECount');
var deleteCountEdit = document.getElementById('deleteCountEdit');
var saveRegionEdit = document.getElementById('saveRegionEdit');
var saveCountryEdit = document.getElementById('saveCountryEdit');
var darkImageNewCity = document.getElementById('darkImageNewCity');
var closeNewCity = document.getElementById('closeNewCity');
var cancelCity = document.getElementById('cancelCity');
var newCity = document.getElementById('newCity');
var msgNCit = document.getElementById('msgNCit');
var saveCity = document.getElementById('saveCity');
var varRegionId = null;
var varCountryId = null;
/* let varCityId = null */

var varEditRegion = 0;
var varEditCountry = 0; //show regions, countries and cities

function getLocations() {
  var options, response, data;
  return regeneratorRuntime.async(function getLocations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(varCountryId);
          regionList.innerHTML = '';
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/regionsCountriesCities', options));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          console.log(data);
          data.forEach(function (reg) {
            var region = document.createElement('li');
            var countryList = document.createElement('ul');
            var btnEditRegion = document.createElement('button');
            var btnDeleteRegion = document.createElement('button');
            var btnAddCountry = document.createElement('button');
            var regionAndButtons = document.createElement('div');
            var regContainer = document.createElement('div');
            var regTitle = document.createElement('h4');
            regTitle.innerText = reg.region_name;
            btnEditRegion.innerText = 'Edit';
            btnDeleteRegion.innerText = 'Delete';
            btnAddCountry.innerText = 'Add country';
            region.classList.add('l-item');
            btnEditRegion.classList = 'btn edit';
            btnDeleteRegion.classList = 'btn delete';
            btnAddCountry.classList = 'btn add';
            regContainer.classList.add('reg-container');
            regTitle.classList.add('reg-title');
            regionAndButtons.classList.add('reg-btn');
            regionAndButtons.appendChild(regTitle);
            regionAndButtons.appendChild(btnEditRegion);
            regionAndButtons.appendChild(btnDeleteRegion);
            regContainer.appendChild(regionAndButtons);
            regContainer.appendChild(btnAddCountry);
            region.appendChild(regContainer);
            region.appendChild(countryList);
            regionList.appendChild(region);
            btnDeleteRegion.addEventListener('click', function () {
              return modalDeleteRegion(reg.region_id);
            });
            btnEditRegion.addEventListener('click', function () {
              return regionEdition(reg);
            });
            btnAddCountry.addEventListener('click', function () {
              window.scrollTo(0, 0);
              body.classList.add('modal');
              darkImageNewCountry.classList.remove('none');
              varRegionId = +reg.region_id;
              console.log(varRegionId);
            });
            reg.countries.forEach(function (count) {
              var country = document.createElement('li');
              var countContainer = document.createElement('div');
              var countryAndBtn = document.createElement('div');
              var countTitle = document.createElement('h5');
              var btnEditCountry = document.createElement('button');
              var btnDeleteCountry = document.createElement('button');
              var btnAddCity = document.createElement('button');
              var cityList = document.createElement('ul');
              countTitle.innerText = count.country_name;
              btnEditCountry.innerText = 'Edit';
              btnDeleteCountry.innerText = 'Delete';
              btnAddCity.innerText = 'Add city';
              country.classList.add('l-item');
              btnEditCountry.classList = 'btn edit';
              btnDeleteCountry.classList = 'btn delete';
              btnAddCity.classList = 'btn add';
              countTitle.classList.add('count-title');
              countContainer.classList.add('count-container');
              countryAndBtn.classList.add('count-btn');
              countryAndBtn.appendChild(countTitle);
              countryAndBtn.appendChild(btnEditCountry);
              countryAndBtn.appendChild(btnDeleteCountry);
              countContainer.appendChild(countryAndBtn);
              countContainer.appendChild(btnAddCity);
              country.appendChild(countContainer);
              country.appendChild(cityList);
              countryList.appendChild(country);
              btnDeleteCountry.addEventListener('click', function () {
                return modalDeleteCountry(count.country_id);
              });
              btnEditCountry.addEventListener('click', function () {
                return countryEdition(count);
              });
              btnAddCity.addEventListener('click', function () {
                window.scrollTo(0, 0);
                body.classList.add('modal');
                darkImageNewCity.classList.remove('none');
                varCountryId = +count.country_id;
                console.log(varCountryId);
              });
              count.cities.forEach(function (cit) {
                var city = document.createElement('li');
                var cityTitle = document.createElement('h6');
                var btnEditCity = document.createElement('button');
                var btnDeleteCity = document.createElement('button');
                cityTitle.innerText = cit.city_name;
                btnEditCity.innerText = 'Edit';
                btnDeleteCity.innerText = 'Delete';
                city.classList = 'l-item city-container';
                cityTitle.classList.add('city-title');
                btnEditCity.classList = 'btn edit';
                btnDeleteCity.classList = 'btn delete';
                city.appendChild(cityTitle);
                city.appendChild(btnEditCity);
                city.appendChild(btnDeleteCity);
                cityList.appendChild(city);
              });
            });
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
} //add region


addRegBtn.addEventListener('click', function () {
  window.scrollTo(0, 0);
  body.classList.add('modal');
  darkImage.classList.remove('none');
  /* newRegion.addEventListener('keyup', () => disabledBtn()) */
});
/* function disabledBtn() {
    if(newRegion.value !== '') {
        saveRegion.classList.add('blue')
    }
    if(newRegion.value === '')
        saveRegion.classList.remove('blue')
} */

saveRegion.addEventListener('click', function (event) {
  return addRegion(event);
});

function addRegion(event) {
  var region, options, response, data;
  return regeneratorRuntime.async(function addRegion$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          region = {
            region_name: newRegion.value
          };
          options = {
            method: 'POST',
            body: JSON.stringify(region),
            headers: {
              "Content-Type": "application/json",
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          validateLocation(newRegion, msgNReg);
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/regions', options));

        case 6:
          response = _context2.sent;

          if (response.status === 409) {
            newRegion.classList.add('border-wrong');
            msgNReg.classList.add('visible');
            msgNReg.innerText = 'La región ya existe';
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          data = _context2.sent;
          console.log(data);
          closeWindowNewRegion(event);
          getLocations();
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](3);
          return _context2.abrupt("return", _context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 16]]);
} //validate region


function validateLocation(location, msg) {
  //newRegion, msgNReg
  if (location.value === '') {
    location.classList.add('border-wrong');
    msg.classList.add('visible');
    location.addEventListener('keyup', function () {
      if (location.value !== '') {
        location.classList.remove('border-wrong');
        msg.classList.remove('visible');
      }
    });
  }
} //close window new region


closeNewRegion.addEventListener('click', function (event) {
  return closeWindowNewRegion(event);
});
cancelRegion.addEventListener('click', function (event) {
  return closeWindowNewRegion(event);
});

function closeWindowNewRegion(event) {
  event.preventDefault();
  darkImage.classList.add('none');
  body.classList.remove('modal');
  msgNReg.classList.remove('visible');
  newRegion.classList.remove('border-wrong');
  newRegion.value = '';
  msgNReg.innerText = 'Este campo es obligatorio';
} //delete region 


function modalDeleteRegion(regionId) {
  console.log(regionId);
  varRegionId = regionId;
  window.scrollTo(0, 0);
  body.classList.add('modal');
  darkImageRegions.classList.remove('none');
}

cancelDltRegBtn.addEventListener('click', function () {
  /* window.scrollTo(0, 0)
  body.classList.add('modal')
  darkImageEditReg.style.visibility = 'visible' */
  cancelDeleteReg();
});

function cancelDeleteReg() {
  if (varEditRegion === 0) {
    console.log('despues de no edition');
    body.classList.remove('modal');
    darkImageEditReg.style.visibility = 'hidden';
    darkImageEditReg.classList.add('none');
  } else if (varEditRegion === 1) {
    console.log('despues de edition');
    window.scrollTo(0, 0);
    body.classList.add('modal');
    darkImageEditReg.style.visibility = 'visible';
    darkImageEditReg.classList.remove('none');
  }

  darkImageRegions.classList.add('none');
  console.log(varRegionId);
}

function cancelReg() {
  body.classList.remove('modal');
  darkImageRegions.classList.add('none');
  varRegionId = null;
  console.log(varRegionId);
}

deleteRegBtn.addEventListener('click', function () {
  body.classList.remove('modal');
  darkImageRegions.classList.add('none');
  deleteRegion(varRegionId);
});

function deleteRegion(regId) {
  var options, response, data;
  return regeneratorRuntime.async(function deleteRegion$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          options = {
            method: 'DELETE',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context3.prev = 1;
          console.log(varRegionId);
          _context3.next = 5;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/regions/".concat(regId), options));

        case 5:
          response = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context3.sent;
          console.log(data);
          cancelReg();
          getLocations();
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", _context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 14]]);
} //edit region


function regionEdition(reg) {
  console.log(reg);
  window.scrollTo(0, 0);
  darkImageEditReg.classList.remove('none');
  darkImageEditReg.style.visibility = 'visible';
  body.classList.add('modal');
  /* main.classList.add('height-add-ctc') */

  regionEdit.value = reg.region_name;
  varRegionId = reg.region_id;
  varEditRegion = 1;
} //close window edit region


closeEditRegion.addEventListener('click', function () {
  return closeWindowEditRegion();
});

function closeWindowEditRegion() {
  /* event.preventDefault() */
  darkImageEditReg.classList.add('none');
  body.classList.remove('modal');
  regionEdit.classList.remove('border-wrong');
  msgEReg.classList.remove('visible');
  varEditRegion = 0;
  msgEReg.innerText = 'Este campo es obligatorio';
}

deleteRegEdit.addEventListener('click', function () {
  /* darkImageEditReg.style.visibility = 'hidden' */
  darkImageEditReg.style.visibility = 'visible';
  darkImageEditReg.classList.add('none');
  modalDeleteRegion(varRegionId);
}); //save edited region

saveRegionEdit.addEventListener('click', function () {
  return editRegion();
});

function editRegion() {
  var modifiedRegion, options, response, data;
  return regeneratorRuntime.async(function editRegion$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          modifiedRegion = {
            region_name: regionEdit.value
          };
          msgEReg.innerText = 'Este campo es obligatorio';
          validateLocation(regionEdit, msgEReg);
          options = {
            method: 'PUT',
            body: JSON.stringify(modifiedRegion),
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token'))),
              "Content-Type": "application/json"
            }
          };
          _context4.prev = 4;
          _context4.next = 7;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/regions/".concat(varRegionId), options));

        case 7:
          response = _context4.sent;

          if (response.status === 409) {
            regionEdit.classList.add('border-wrong');
            msgEReg.classList.add('visible');
            msgEReg.innerText = 'La región ya existe';
          }

          _context4.next = 11;
          return regeneratorRuntime.awrap(response.json());

        case 11:
          data = _context4.sent;
          console.log(data);
          closeWindowEditRegion();
          _context4.next = 19;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](4);
          return _context4.abrupt("return", _context4.t0);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[4, 16]]);
} //add country 


function addCountry(event, reg) {
  var country, options, response, data;
  return regeneratorRuntime.async(function addCountry$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          event.preventDefault();
          country = {
            region_id: +reg,
            country_name: newCountry.value
          };
          options = {
            method: 'POST',
            body: JSON.stringify(country),
            headers: {
              "Content-Type": "application/json",
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          msgNCount.innerText = 'Este campo es obligatorio';
          validateLocation(newCountry, msgNCount);
          _context5.prev = 5;
          _context5.next = 8;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/countries', options));

        case 8:
          response = _context5.sent;

          if (response.status === 409) {
            newCountry.classList.add('border-wrong');
            msgNCount.classList.add('visible');
            msgNCount.innerText = 'El país ya existe';
          }

          _context5.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context5.sent;
          console.log(data);
          closeWindowNewCountry();
          getLocations();
          _context5.next = 21;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](5);
          return _context5.abrupt("return", _context5.t0);

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 18]]);
} //close new country window


closeNewCountry.addEventListener('click', function () {
  return closeWindowNewCountry();
});
cancelCountry.addEventListener('click', function () {
  return closeWindowNewCountry();
});

function closeWindowNewCountry() {
  darkImageNewCountry.classList.add('none');
  newCountry.classList.remove('border-wrong');
  msgNCount.classList.remove('visible');
  body.classList.remove('modal');
  newCountry.value = '';
  msgNCount.innerText = 'Este campo es obligatorio';
  varRegionId = null;
}

saveCountry.addEventListener('click', function (event) {
  return addCountry(event, varRegionId);
}); //delete country

function modalDeleteCountry(countryId) {
  console.log(countryId);
  varCountryId = countryId;
  window.scrollTo(0, 0);
  body.classList.add('modal');
  darkImageCountries.classList.remove('none');
}

cancelDltCountBtn.addEventListener('click', function () {
  /* window.scrollTo(0, 0)
  body.classList.add('modal')
  darkImageEditReg.style.visibility = 'visible' */
  cancelDeleteCount();
});

function cancelDeleteCount() {
  if (varEditCountry === 0) {
    console.log('despues de no edition');
    body.classList.remove('modal');
    darkImageEditCount.style.visibility = 'hidden';
    darkImageEditCount.classList.add('none');
  } else if (varEditCountry === 1) {
    console.log('despues de edition');
    window.scrollTo(0, 0);
    body.classList.add('modal');
    darkImageEditCount.style.visibility = 'visible';
    darkImageEditCount.classList.remove('none');
  }

  darkImageCountries.classList.add('none');
  /* console.log(varRegionId) */
}

deleteCountBtn.addEventListener('click', function () {
  body.classList.remove('modal');
  darkImageCountries.classList.add('none');
  deleteCountry(varCountryId);
});

function deleteCountry(countId) {
  var options, response, data;
  return regeneratorRuntime.async(function deleteCountry$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          options = {
            method: 'DELETE',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context6.prev = 1;
          console.log(varCountryId);
          console.log(countId);
          _context6.next = 6;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/countries/".concat(countId), options));

        case 6:
          response = _context6.sent;
          _context6.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context6.sent;
          console.log(data);
          cancelCount();
          getLocations();
          _context6.next = 18;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", _context6.t0);

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 15]]);
}

function cancelCount() {
  body.classList.remove('modal');
  darkImageCountries.classList.add('none');
  varCountryId = null;
  console.log(varCountryId);
} //edit country


function countryEdition(count) {
  console.log(count);
  window.scrollTo(0, 0);
  darkImageEditCount.classList.remove('none');
  darkImageEditCount.style.visibility = 'visible';
  body.classList.add('modal');
  /* main.classList.add('height-add-ctc') */

  countryEdit.value = count.country_name;
  varCountryId = count.country_id;
  varEditCountry = 1;
} //close window edit country


closeEditCountry.addEventListener('click', function () {
  return closeWindowEditCountry();
});

function closeWindowEditCountry() {
  /* event.preventDefault() */
  darkImageEditCount.classList.add('none');
  body.classList.remove('modal');
  countryEdit.classList.remove('border-wrong');
  msgECount.classList.remove('visible');
  varEditCountry = 0;
  msgECount.innerText = 'Este campo es obligatorio';
  varCountryId = null;
}

deleteCountEdit.addEventListener('click', function () {
  darkImageEditCount.style.visibility = 'visible';
  darkImageEditCount.classList.add('none');
  modalDeleteCountry(varCountryId);
}); //save edited country

saveCountryEdit.addEventListener('click', function () {
  return editCountry();
});

function editCountry() {
  var modifiedCountry, options, response, data;
  return regeneratorRuntime.async(function editCountry$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          modifiedCountry = {
            country_name: countryEdit.value
          };
          msgECount.innerText = 'Este campo es obligatorio';
          validateLocation(countryEdit, msgECount);
          options = {
            method: 'PUT',
            body: JSON.stringify(modifiedCountry),
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token'))),
              "Content-Type": "application/json"
            }
          };
          _context7.prev = 4;
          _context7.next = 7;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/countries/".concat(varCountryId), options));

        case 7:
          response = _context7.sent;

          if (response.status === 409) {
            countryEdit.classList.add('border-wrong');
            msgECount.classList.add('visible');
            msgECount.innerText = 'El país ya existe';
          }

          _context7.next = 11;
          return regeneratorRuntime.awrap(response.json());

        case 11:
          data = _context7.sent;
          console.log(data);
          closeWindowEditCountry();
          getLocations();
          console.log(varCountryId);
          _context7.next = 21;
          break;

        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](4);
          return _context7.abrupt("return", _context7.t0);

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[4, 18]]);
} //add city


function addCity(event, count) {
  var city, options, response, data;
  return regeneratorRuntime.async(function addCity$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          event.preventDefault();
          city = {
            country_id: +count,
            city_name: newCity.value
          };
          options = {
            method: 'POST',
            body: JSON.stringify(city),
            headers: {
              "Content-Type": "application/json",
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          msgNCit.innerText = 'Este campo es obligatorio';
          validateLocation(newCity, msgNCit);
          _context8.prev = 5;
          _context8.next = 8;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/cities', options));

        case 8:
          response = _context8.sent;

          if (response.status === 409) {
            newCity.classList.add('border-wrong');
            msgNCit.classList.add('visible');
            msgNCit.innerText = 'La ciudad ya existe';
          }

          _context8.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context8.sent;
          console.log(data);
          closeWindowNewCity();
          getLocations();
          _context8.next = 21;
          break;

        case 18:
          _context8.prev = 18;
          _context8.t0 = _context8["catch"](5);
          return _context8.abrupt("return", _context8.t0);

        case 21:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[5, 18]]);
} //close new country window


closeNewCity.addEventListener('click', function () {
  return closeWindowNewCity();
});
cancelCity.addEventListener('click', function () {
  return closeWindowNewCity();
});

function closeWindowNewCity() {
  darkImageNewCity.classList.add('none');
  newCity.classList.remove('border-wrong');
  msgNCit.classList.remove('visible');
  body.classList.remove('modal');
  newCity.value = '';
  msgNCit.innerText = 'Este campo es obligatorio';
  varCountryId = null;
}

saveCity.addEventListener('click', function (event) {
  return addCity(event, varCountryId);
});