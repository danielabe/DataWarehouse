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
  var options, response, data;
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
          data.forEach(function (reg) {
            var region = document.createElement('li');
            var countryList = document.createElement('ul');
            var btnAddCountry = document.createElement('button');
            var regContainer = document.createElement('div');
            var regTitle = document.createElement('h4');
            regTitle.innerText = reg.region_name;
            btnAddCountry.innerText = 'Add country';
            region.classList.add('l-item');
            btnAddCountry.classList = 'btn add';
            regContainer.classList.add('reg-container');
            regTitle.classList.add('reg-title');
            regContainer.appendChild(regTitle);
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
          return _context5.stop();
      }
    }
  });
}