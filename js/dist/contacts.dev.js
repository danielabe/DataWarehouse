"use strict";

var darkImageContacts = document.getElementById('darkImageContacts');
var cancelDltContBtn = document.getElementById('cancelDltContBtn');
var deleteContactBtn = document.getElementById('deleteContactBtn');
var contactsList = document.getElementById('contactsList');
var sortName = document.getElementById('sortName');
var varSortName = 0;
contacts.addEventListener('click', function () {
  getContacts();
});

function getContacts() {
  var options, response, data;
  return regeneratorRuntime.async(function getContacts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          contactsList.innerHTML = ''; //ver si puedo sacar este

          console.log(JSON.parse(sessionStorage.getItem('Token')));
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/contacts', options));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          renderResults(data);
          sortName.addEventListener('click', function () {
            if (varSortName === 0) {
              sortByName(data);
            } else if (varSortName === 1) {
              sortByNameReverse(data);
            }
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderResults(data) {
  contactsList.innerHTML = '';
  data.forEach(function _callee(element) {
    var info, row, checkbox, contact, country, company, position, preferredChannel, interest, actions, ellipsis, trash, pen;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            info = {
              contactId: element.contact_id,
              firstname: element.firstname,
              lastname: element.lastname,
              email: element.email,
              cityId: element.city_id,
              cityName: element.city_name,
              countryId: element.country_id,
              countryName: element.country_name,
              regionId: element.region_id,
              regionName: element.region_name,
              companyId: element.company_id,
              companyName: element.company_name,
              position: element.position,
              preferredChannel: element.preferred_channels,
              interest: element.interest
            };
            row = document.createElement('div');
            checkbox = document.createElement('i');
            contact = document.createElement('div');
            country = document.createElement('div');
            company = document.createElement('div');
            position = document.createElement('div');
            preferredChannel = document.createElement('div');
            interest = document.createElement('div');
            actions = document.createElement('div');
            ellipsis = document.createElement('i');
            trash = document.createElement('i');
            pen = document.createElement('i');
            contact.innerHTML = "<p>".concat(info.firstname, " ").concat(info.lastname, "</p><p class=\"grey-info\">").concat(info.email, "</p>");
            country.innerHTML = "<p>".concat(info.countryName, "</p><p class=\"grey-info\">").concat(info.regionName, "</p>");
            company.innerText = info.companyName;
            position.innerText = info.position;
            info.preferredChannel.map(function (element) {
              //esto no es obligatorio
              var channel = document.createElement('div');
              channel.innerText = element.channel_name;
              channel.classList.add('channel');
              preferredChannel.appendChild(channel);
            });
            row.classList.add('row-contact');
            contact.classList = 'u-item col-item';
            country.classList = 'u-item col-item';
            company.classList.add('u-item');
            position.classList.add('u-item');
            preferredChannel.classList.add('u-item');
            interest.classList.add('u-item');
            checkbox.classList = 'far fa-square u-item';
            actions.classList = 'u-item action';
            ellipsis.classList = 'fas fa-ellipsis-h';
            trash.classList = 'fas fa-trash none';
            pen.classList = 'fas fa-pen none';

            if (+info.interest === 100) {
              interest.innerHTML = "<label class=\"percentage\" for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            } else if (75 <= +info.interest && +info.interest < 100) {
              interest.innerHTML = "<label class=\"percentage\" for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress orange\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            } else if (50 <= +info.interest && +info.interest < 75) {
              interest.innerHTML = "<label class=\"percentage\" for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress yellow\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            } else if (25 <= +info.interest && +info.interest < 50) {
              interest.innerHTML = "<label class=\"percentage\" for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress blue\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            } else if (0 <= +info.interest && +info.interest < 25) {
              interest.innerHTML = "<label class=\"percentage\" for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress grey\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            }

            actions.appendChild(ellipsis);
            actions.appendChild(trash);
            actions.appendChild(pen);
            contactsList.appendChild(row);
            row.appendChild(checkbox);
            row.appendChild(contact);
            row.appendChild(country);
            row.appendChild(company);
            row.appendChild(position);
            row.appendChild(preferredChannel);
            row.appendChild(interest);
            row.appendChild(actions);
            row.addEventListener('mouseover', function () {
              return hoverRow(ellipsis, trash, pen);
            });
            row.addEventListener('mouseout', function () {
              return outRow(ellipsis, trash, pen);
            });
            trash.addEventListener('click', function () {
              return modalDelete(info, contactsList);
            });
            pen.addEventListener('click', function () {
              return editUser(info, contactsList);
            });

          case 47:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}

function modalDelete(info, contactsList) {
  window.scrollTo(0, 0);
  body.classList.add('modal');
  darkImageContacts.classList.remove('none');
  cancelDltContBtn.addEventListener('click', function () {
    body.classList.remove('modal');
    darkImageContacts.classList.add('none');
  });
  deleteContactBtn.addEventListener('click', function () {
    body.classList.remove('modal');
    darkImageContacts.classList.add('none');
    contactsList.innerHTML = '';
    deleteContact(info, contactsList);
  });
}

function deleteContact(info, contactsList) {
  var options, response, data;
  return regeneratorRuntime.async(function deleteContact$(_context3) {
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
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/contacts/".concat(info.contactId), options));

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context3.sent;
          getContacts();

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function sortByName(data) {
  var sortedNames = data.sort(function (a, b) {
    if (a.firstname > b.firstname) {
      return 1;
    }

    if (a.firstname < b.firstname) {
      return -1;
    } // a must be equal to b


    return 0;
  });
  renderResults(sortedNames);
  varSortName = 1;
}

function sortByNameReverse(data) {
  var sortedNames = data.reverse(function (a, b) {
    if (a.firstname > b.firstname) {
      return 1;
    }

    if (a.firstname < b.firstname) {
      return -1;
    } // a must be equal to b


    return 0;
  });
  renderResults(sortedNames);
  varSortName = 0;
}