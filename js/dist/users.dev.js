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
var saveUser = document.getElementById('saveUser');
var msgUserEmail = document.getElementById('msgUserEmail');
var msgUserName = document.getElementById('msgUserName');
var msgUserLastname = document.getElementById('msgUserLastname');
var msgUserPass = document.getElementById('msgUserPass');
var msgUserPassRep = document.getElementById('msgUserPassRep');
var varSelectPerfil = 0;

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
  msgUserEmail.innerText = 'Error en datos ingresados';
  userName.classList.remove('border-wrong');
  msgUserName.classList.remove('visible');
  userLastname.classList.remove('border-wrong');
  msgUserLastname.classList.remove('visible');
  userEmail.classList.remove('border-wrong');
  msgUserEmail.classList.remove('visible');
  userPass.classList.remove('border-wrong');
  msgUserPass.style.color = '#333333';
  userPassRep.classList.remove('border-wrong');
  msgUserPassRep.classList.remove('visible');
  perfilSlt.classList.remove('border-wrong');
  darkImageNewUser.classList.add('none');
  perfilList.classList.add('no-visible');
  /* varCompCityId = null
  varSelectCityComp = 0 */

  varSelectPerfil = 0;
} //select perfil


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
} //save user


saveUser.addEventListener('click', function (event) {
  return addContact(event);
});

function addContact(event) {
  var user, options, response, data;
  return regeneratorRuntime.async(function addContact$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          msgUserEmail.innerText = 'Error en datos ingresados';
          event.preventDefault();
          user = {
            firstname: userName.value,
            lastname: userLastname.value,
            email: userEmail.value,
            perfil: perfilSlt.innerText,
            password: userPass.value,
            repeated_password: userPassRep.value
          };
          validateUserData(user, userName, msgUserName, userLastname, msgUserLastname, userEmail, msgUserEmail, perfilSlt, perfilList, userPass, msgUserPass, userPassRep, msgUserPassRep);
          options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/users/register', options));

        case 8:
          response = _context4.sent;

          if (response.status === 409) {
            userEmail.classList.add('border-wrong');
            msgUserEmail.classList.add('visible');
            msgUserEmail.innerText = 'El email ya existe';
          }

          _context4.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context4.sent;
          console.log(data);
          _context4.next = 19;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](5);
          return _context4.abrupt("return", _context4.t0);

        case 19:
          closeWindowNewUser(event);
          getUsers();

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 16]]);
}

function validateUserData(user, usName, msgUsName, usLastname, msgUsLastname, usEmail, msgUsEmail, perfilSlt, perfilList, usPass, msgUsPass, usPassRep, msgUsPassRep) {
  if (usName.value === '') {
    usName.classList.add('border-wrong');
    msgUsName.classList.add('visible');
    usName.addEventListener('keyup', function () {
      if (usName.value !== '') {
        usName.classList.remove('border-wrong');
        msgUsName.classList.remove('visible');
      }
    });
  }

  if (usLastname.value === '') {
    usLastname.classList.add('border-wrong');
    msgUsLastname.classList.add('visible');
    usLastname.addEventListener('keyup', function () {
      if (usLastname.value !== '') {
        usLastname.classList.remove('border-wrong');
        msgUsLastname.classList.remove('visible');
      }
    });
  }

  if (usEmail.value === '' || !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(usEmail.value)) {
    usEmail.classList.add('border-wrong');
    msgUsEmail.classList.add('visible');
    usEmail.addEventListener('keyup', function () {
      if (usEmail.value !== '' && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(usEmail.value)) {
        usEmail.classList.remove('border-wrong');
        msgUsEmail.classList.remove('visible');
      }
    });
  }

  if (perfilSlt.innerText === 'Seleccionar perfil') {
    perfilSlt.classList.add('border-wrong');
    perfilList.addEventListener('click', function () {
      console.log(perfilSlt.innerText);

      if (perfilSlt.innerText !== 'Seleccionar ciudad') {
        console.log('//////');
        perfilSlt.classList.remove('border-wrong');
      }
    });
  }

  if (usPass.value === '' || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(usPass.value)) {
    usPass.classList.add('border-wrong');
    msgUsPass.style.color = '#F03738';
    usPass.addEventListener('keyup', function () {
      if (usPass.value !== '') {
        usPass.classList.remove('border-wrong');
        msgUsPass.style.color = '#333333';
      }
    });
  }

  if (usPassRep.value === '' || usPassRep.value !== usPass.value || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(usPassRep.value)) {
    usPassRep.classList.add('border-wrong');
    msgUsPassRep.classList.add('visible');
    usPassRep.addEventListener('keyup', function () {
      if (usPassRep.value !== '') {
        usPassRep.classList.remove('border-wrong');
        msgUsPassRep.classList.remove('visible');
      }
    });
  }
}