"use strict";

var submit = document.getElementById('submit');
var username = document.getElementById('username');
var password = document.getElementById('password');
var login = document.getElementById('login');
var usersSection = document.getElementById('usersSection');
var headUs = document.getElementById('headUs');
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
            login.classList.add('none'); //section que aparece luego de login

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
  var options, response, data, users;
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
          users = document.createElement('div');
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
            var accions = document.createElement('div');
            user.innerText = info.firstname + ' ' + info.lastname;
            email.innerText = info.email;
            perfil.innerText = info.perfil;
            accions.innerText = "eliminar";
            users.classList.add('users-list');
            row.classList.add('row-user');
            user.classList.add('u-item');
            email.classList.add('u-item');
            perfil.classList.add('u-item');
            accions.classList.add('u-item');
            users.appendChild(row);
            row.appendChild(user);
            row.appendChild(email);
            row.appendChild(perfil);
            row.appendChild(accions);
            usersSection.appendChild(users);
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}