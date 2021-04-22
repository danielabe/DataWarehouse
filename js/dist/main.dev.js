"use strict";

sessionStorage.clear();
var varSect = 'log';
var submit = document.getElementById('submit');
var username = document.getElementById('username');
var password = document.getElementById('password');
var login = document.getElementById('login');
var usersSection = document.getElementById('usersSection');
var headUs = document.getElementById('headUs');
var contacts = document.getElementById('contacts');
var companies = document.getElementById('companies');
var users = document.getElementById('users');
var locations = document.getElementById('location');
var locationSection = document.getElementById('locationSection');
var companiesSection = document.getElementById('companiesSection');
var contactsSection = document.getElementById('contactsSection');
var regionList = document.getElementById('regionList');
submit.addEventListener('click', function (event) {
  event.preventDefault();
  loginFunction(); //funcion nueva pantalla
});

function loginFunction() {
  var user, options, response, data;
  return regeneratorRuntime.async(function loginFunction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = {
            username: username.value,
            password: password.value
          };
          options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json"
            }
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/users/login', options));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;

          if (response.status === 200) {
            console.log(data);
            saveToken(data);
            login.classList.add('none');
            varSect = 'noLog'; //section que aparece luego de login

            usersSection.classList.remove('none');
            getUsers();
          }

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function saveToken(data) {
  sessionStorage.setItem('Token', JSON.stringify(data));
}

function getUsers() {
  var options, response, data, usersList;
  return regeneratorRuntime.async(function getUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(JSON.parse(sessionStorage.getItem('Token')));
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/users', options));

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context2.sent;
          console.log(data);
          usersList = document.createElement('div');
          data.forEach(function (element) {
            var info = {
              userId: element.user_id,
              firstname: element.firstname,
              lastname: element.lastname,
              email: element.email,
              perfil: element.perfil
            };
            console.log(element);
            var row = document.createElement('div');
            var user = document.createElement('div');
            var email = document.createElement('div');
            var perfil = document.createElement('div');
            var actions = document.createElement('div');
            var ellipsis = document.createElement('i');
            var trash = document.createElement('i');
            var pen = document.createElement('i');
            user.innerText = info.firstname + ' ' + info.lastname;
            email.innerText = info.email;
            perfil.innerText = info.perfil;
            usersList.classList.add('users-list');
            row.classList.add('row-user');
            user.classList.add('u-item');
            email.classList.add('u-item');
            perfil.classList.add('u-item');
            actions.classList = 'u-item action';
            ellipsis.classList = 'fas fa-ellipsis-h';
            trash.classList = 'fas fa-trash none';
            pen.classList = 'fas fa-pen none';
            actions.appendChild(ellipsis);
            actions.appendChild(trash);
            actions.appendChild(pen);
            usersList.appendChild(row);
            row.appendChild(user);
            row.appendChild(email);
            row.appendChild(perfil);
            row.appendChild(actions);
            usersSection.appendChild(usersList);
            row.addEventListener('mouseover', function () {
              return hoverRow(ellipsis, trash, pen);
            });
            row.addEventListener('mouseout', function () {
              return outRow(ellipsis, trash, pen);
            });
            trash.addEventListener('click', function () {
              return deleteUser(info, usersList);
            });
            pen.addEventListener('click', function () {
              return editUser(info, usersList);
            });
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function hoverRow(ellipsis, trash, pen) {
  ellipsis.classList.add('none');
  trash.classList.remove('none');
  pen.classList.remove('none');
}

function outRow(ellipsis, trash, pen) {
  ellipsis.classList.remove('none');
  trash.classList.add('none');
  pen.classList.add('none');
}

function deleteUser(info, usersList) {
  var options, response, data;
  return regeneratorRuntime.async(function deleteUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          options = {
            method: 'DELETE',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/users/".concat(info.userId), options));

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context3.sent;
          console.log(data);
          usersList.remove();
          getUsers();

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function editUser(info, usersList) {
  var options, response, data;
  return regeneratorRuntime.async(function editUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          //esta funcion la voy a hacer luego, para ver
          options = {
            //primero como se hace en contactos, hacer
            method: 'PUT',
            //diseño correspondiente y generar json para el body
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/users/".concat(info.userId), options));

        case 3:
          response = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context4.sent;
          console.log(data);
          usersList.remove();
          getUsers();

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}

contacts.addEventListener('click', function () {
  if (varSect !== 'log') {
    contacts.classList.add('bold');
    companies.classList.remove('bold');
    users.classList.remove('bold');
    locations.classList.remove('bold');
    contactsSection.classList.remove('none');
    companiesSection.classList.add('none');
    usersSection.classList.add('none');
    locationSection.classList.add('none');
  }
});
companies.addEventListener('click', function () {
  if (varSect !== 'log') {
    contacts.classList.remove('bold');
    companies.classList.add('bold');
    users.classList.remove('bold');
    locations.classList.remove('bold');
    contactsSection.classList.add('none');
    companiesSection.classList.remove('none');
    usersSection.classList.add('none');
    locationSection.classList.add('none');
  }
});
users.addEventListener('click', function () {
  if (varSect !== 'log') {
    contacts.classList.remove('bold');
    companies.classList.remove('bold');
    users.classList.add('bold');
    locations.classList.remove('bold');
    contactsSection.classList.add('none');
    companiesSection.classList.add('none');
    usersSection.classList.remove('none');
    locationSection.classList.add('none');
    usersList.remove();
    getUsers();
  }
});
locations.addEventListener('click', function () {
  if (varSect !== 'log') {
    contacts.classList.remove('bold');
    companies.classList.remove('bold');
    users.classList.remove('bold');
    locations.classList.add('bold');
    contactsSection.classList.add('none');
    companiesSection.classList.add('none');
    usersSection.classList.add('none');
    locationSection.classList.remove('none');
    getLocations();
  }
});

function getLocations() {
  var options, response, data, regionsArray, uniqueRegions, countriesArray, uniqueCountries;
  return regeneratorRuntime.async(function getLocations$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          regionList.innerHTML = '';
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context5.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/regionsCountriesCities', options));

        case 4:
          response = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context5.sent;
          console.log(data);
          data.forEach(function (element) {
            var info = {
              regionId: element.region_id,
              regionName: element.region_name,
              countryId: element.country_id,
              countryName: element.country_name,
              cityId: element.city_id,
              cityName: element.city_name
            };
            console.log(element);
            /* const regions = createElement('ul') */
          });
          regionsArray = [];
          data.map(function (element) {
            regionsArray = regionsArray.concat(element.region_name);
          });
          console.log(regionsArray);
          uniqueRegions = [];
          regionsArray.forEach(function (element) {
            if (!uniqueRegions.includes(element)) {
              uniqueRegions = uniqueRegions.concat(element);
            }
          });
          console.log(uniqueRegions);
          uniqueRegions.forEach(function (element) {
            var region = document.createElement('li');
            var countryList = document.createElement('ul');
            region.innerText = element;
            countryList.classList = 'country-item';
            region.appendChild(countryList);
            regionList.appendChild(region);
          });
          countriesArray = [];
          data.map(function (element) {
            countriesArray = countriesArray.concat(element.country_name);
          });
          console.log(countriesArray);
          uniqueCountries = [];
          countriesArray.forEach(function (element) {
            if (!uniqueCountries.includes(element)) {
              uniqueCountries = uniqueCountries.concat(element);
            }
          });
          console.log(uniqueCountries);

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  });
}