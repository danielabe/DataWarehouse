"use strict";

var submit = document.getElementById('submit');
var username = document.getElementById('username');
var password = document.getElementById('password');
var loginForm = document.getElementById('loginForm');
var usersSection = document.getElementById('usersSection');
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
            method: 'post',
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
            loginForm.classList.add('none'); //section que aparece luego de login

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
  localStorage.setItem('Token', JSON.stringify(data));
}

function getUsers() {
  var options, response, data, ul;
  return regeneratorRuntime.async(function getUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(JSON.parse(localStorage.getItem('Token')));
          options = {
            method: 'get',
            headers: {
              Authorization: "token ".concat(JSON.parse(localStorage.getItem('Token')))
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
          ul = document.createElement('ul');
          /* const item = document.createElement('li')
          ul.appendChild(item)
          item.innerHTML = data[0].firstname */

          usersSection.appendChild(ul);
          data.forEach(function (element) {
            var item = document.createElement('li');
            item.innerHTML = data[element].firstname;
            ul.appendChild(item);
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/* let usersInformation = JSON.parse(localStorage.getItem('UsersInformation')) || []
const userInfo = {
    name: response.name,
    lastname: response.lastname,
    email: response.email,
    age: response.age
}
usersInformation = usersInformation.concat(userInfo)
localStorage.setItem('UsersInformation', JSON.stringify(usersInformation)) */