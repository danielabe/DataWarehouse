"use strict";

var headUs = document.getElementById('headUs');
var usersList = document.getElementById('usersList');
var newUserBtn = document.getElementById('newUserBtn');
var darkImageNewUser = document.getElementById('darkImageNewUser');
var closeNewUser = document.getElementById('closeNewUser');
var cancelUser = document.getElementById('cancelUser');
var userName = document.getElementById('userName');
var userLastname = document.getElementById('userLastname');
var userEmail = document.getElementById('userEmail');
var userPass = document.getElementById('userPass');
var userPassRep = document.getElementById('userPassRep');
var perfilSlt = document.getElementById('perfilSlt');
var perfilList = document.getElementById('perfilList');

function getUsers() {
  var options, response, data;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          usersList.innerHTML = '';
          console.log(JSON.parse(sessionStorage.getItem('Token')));
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/users', options));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          console.log(data);
          data.forEach(function (element) {
            var info = {
              userId: element.user_id,
              firstname: element.firstname,
              lastname: element.lastname,
              email: element.email,
              perfil: element.perfil
            };
            console.log(element);
            var row = document.createElement('li');
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
          return _context.stop();
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
  return regeneratorRuntime.async(function deleteUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          options = {
            method: 'DELETE',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/users/".concat(info.userId), options));

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context2.sent;
          console.log(data);
          getUsers();

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function editUser(info, usersList) {
  var options, response, data;
  return regeneratorRuntime.async(function editUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
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
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/users/".concat(info.userId), options));

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context3.sent;
          console.log(data);
          getUsers();

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
} //add user


newUserBtn.addEventListener('click', function () {
  window.scrollTo(0, 0);
  /* body.classList.add('modal') */

  darkImageNewUser.classList.remove('none');
  /* companyCity.style.top = '0px' */
});
closeNewUser.addEventListener('click', function (event) {
  return closeWindowNewUser(event);
});
cancelUser.addEventListener('click', function (event) {
  return closeWindowNewUser(event);
});

function closeWindowNewUser(event) {
  event.preventDefault();
  userName.value = '';
  userLastname.value = '';
  userEmail.value = '';
  userPass.value = '';
  userPassRep.value = '';
  perfilSlt.innerHTML = 'Seleccionar perfil<i class="fas fa-caret-down"></i>';
  /* msgCompanyName.innerText = 'Este campo es obligatorio' */

  /* body.classList.remove('modal') */

  /* companyName.classList.remove('border-wrong')
  msgCompanyName.classList.remove('visible')
  companyEmail.classList.remove('border-wrong')
  msgCompanyEmail.classList.remove('visible')
  compAddress.classList.remove('border-wrong')
  msgCompAddress.classList.remove('visible')
  compTelephone.classList.remove('border-wrong')
  msgCompTelephone.classList.remove('visible')
  companySlt.classList.remove('border-wrong') */

  darkImageNewUser.classList.add('none');
  perfilList.classList.add('no-visible');
  /* companyCity.style.top = '0px' */

  /* varCompCityId = null
  varSelectCityComp = 0 */

  varSelectPerfil = 0;
} //select perfil

/* cosnt = document.getElementById('') */


var varSelectPerfil = 0;
perfilSlt.addEventListener('click', function () {
  if (varSelectPerfil === 0) {
    var perfilClass = 'perfil';
    showPerfil(perfilList, perfilSlt, perfilClass);
  } else if (varSelectPerfil === 1) {
    perfilList.classList.add('no-visible');
    /* userPerfil.style.top = '0px' */

    /* perfilList.innerHTML = '' */

    varSelectPerfil = 0;
  }
});

function showPerfil(perfList, perfSlt, perfilC) {
  perfList.classList.remove('no-visible');
  varSelectPerfil = 1;
  perfArray = document.querySelectorAll(".".concat(perfilC));
  console.log(perfArray);
  perfArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPerfilFunction(element.innerHTML, perfList, perfSlt);
    });
  });
}

function selectPerfilFunction(perfil, perfList, perfSlt) {
  varSelectPerfil = 0;
  perfList.classList.add('no-visible');
  perfSlt.innerHTML = "".concat(perfil, "<i class=\"fas fa-caret-down\"></i>");
}