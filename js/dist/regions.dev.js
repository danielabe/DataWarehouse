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
var closeNewRegion = document.getElementById('closeNewRegion'); //show regions, countries and cities

function getLocations() {
  var options, response, data;
  return regeneratorRuntime.async(function getLocations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          regionList.innerHTML = '';
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/regionsCountriesCities', options));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
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

        case 10:
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
          validateRegion();
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/regions', options));

        case 6:
          response = _context2.sent;

          /* console.log(response.text()) */

          /* if(response.status === 400) {
              msgContainer.innerHTML = ''
              const msgError = document.createElement('p')
              msgContainer.appendChild(msgError)
              if(newRegion.value.length < 2 || newRegion.value.length > 64) {
                  msgError.innerText = 'Nombre incorrecto'
              } else {
                  msgError.innerText = 'La región ya existe'
              }
          } */

          /* if(response.status === 201) {
              body.classList.remove('modal')
              darkImage.classList.add('none')
              getLocations()
          } */
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
}

var msgNReg = document.getElementById('msgNReg'); //validate region

function validateRegion() {
  if (newRegion.value === '') {
    newRegion.classList.add('border-wrong');
    msgNReg.classList.add('visible');
    newRegion.addEventListener('keyup', function () {
      if (newRegion.value !== '') {
        newRegion.classList.remove('border-wrong');
        msgNReg.classList.remove('visible');
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
}