"use strict";

var submit = document.getElementById('submit');
var username = document.getElementById('username');
var password = document.getElementById('password');
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
          console.log(data);
          saveToken(data);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function saveToken(data) {
  localStorage.setItem('Token', JSON.stringify(data));
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