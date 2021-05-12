"use strict";

var darkImageContacts = document.getElementById('darkImageContacts');
var cancelDltContBtn = document.getElementById('cancelDltContBtn');
var deleteContactBtn = document.getElementById('deleteContactBtn');
var contactsList = document.getElementById('contactsList');
var sortName = document.getElementById('sortName');
var sortCountry = document.getElementById('sortCountry');
var sortCompany = document.getElementById('sortCompany');
var sortPosition = document.getElementById('sortPosition');
var sortInterest = document.getElementById('sortInterest');
var search = document.getElementById('search');
var searchInput = document.getElementById('searchInput');
var checkboxAll = document.getElementById('checkboxAll');
var contCounter = document.getElementById('contCounter');
var counterAndDelete = document.getElementById('counterAndDelete');
var contIdArray = [];
var varSortName = 0;
var varSortCountry = 0;
var varSortCompany = 0;
var varSortPosition = 0;
var varSortInterest = 0;
var varCheckboxAll = 'unselected';
var dataCheckbox = []; //show contacts 

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
          dataCheckbox = data;
          renderResults(data);
          /* checkboxAll.addEventListener('click', () => checkboxAllFunction(data)) */

          sortName.addEventListener('click', function () {
            if (varSortName === 0) {
              sortByName(data);
            } else if (varSortName === 1) {
              sortByNameReverse(data);
            }

            checkAfterSort(data);
          });
          sortCountry.addEventListener('click', function () {
            if (varSortCountry === 0) {
              sortByCountry(data);
            } else if (varSortCountry === 1) {
              sortByCountryReverse(data);
            }

            checkAfterSort(data);
          });
          sortCompany.addEventListener('click', function () {
            if (varSortCompany === 0) {
              sortByCompany(data);
            } else if (varSortCompany === 1) {
              sortByCompanyReverse(data);
            }

            checkAfterSort(data);
          });
          sortPosition.addEventListener('click', function () {
            if (varSortPosition === 0) {
              sortByPosition(data);
            } else if (varSortPosition === 1) {
              sortByPositionReverse(data);
            }

            checkAfterSort(data);
          });
          sortInterest.addEventListener('click', function () {
            if (varSortInterest === 0) {
              sortByInterest(data);
            } else if (varSortInterest === 1) {
              sortByInterestReverse(data);
            }

            checkAfterSort(data);
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}

function checkAfterSort(data) {
  counterAndDelete.classList.add('hidden');
  varCheckboxAll = 'indeterminate';
  console.log(varCheckboxAll);
  checkboxAllFunction(data);
}

checkboxAll.addEventListener('click', function () {
  return checkboxAllFunction(dataCheckbox);
});

function renderResults(data) {
  /* checkboxAll.classList = 'fas fa-check-square'
          checkboxAllFunction(data)
   */
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
              interest: element.interest,
              varSelectContact: 0
            };
            row = document.createElement('li');
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
            checkbox.classList = 'far fa-square u-item select';
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
            checkbox.addEventListener('click', function () {
              return selectContact(checkbox, info, data, row);
            });

          case 48:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
} //delete contact


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
} //sort columns


function sortByName(data) {
  var sortedNames = data.sort(function (a, b) {
    if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) {
      return 1;
    }

    if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedNames);
  varSortName = 1;
  /* varCheckboxAll = 0 */
}

function sortByNameReverse(data) {
  var sortedNames = data.reverse(function (a, b) {
    if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) {
      return 1;
    }

    if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedNames);
  varSortName = 0;
}

function sortByCountry(data) {
  var sortedCountries = data.sort(function (a, b) {
    if (a.country_name.toUpperCase() > b.country_name.toUpperCase()) {
      return 1;
    }

    if (a.country_name.toUpperCase() < b.country_name.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedCountries);
  varSortCountry = 1;
}

function sortByCountryReverse(data) {
  var sortedCountries = data.reverse(function (a, b) {
    if (a.country_name.toUpperCase() > b.country_name.toUpperCase()) {
      return 1;
    }

    if (a.country_name.toUpperCase() < b.country_name.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedCountries);
  varSortCountry = 0;
}

function sortByCompany(data) {
  var sortedCompanies = data.sort(function (a, b) {
    if (a.company_name.toUpperCase() > b.company_name.toUpperCase()) {
      return 1;
    }

    if (a.company_name.toUpperCase() < b.company_name.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedCompanies);
  varSortCompany = 1;
}

function sortByCompanyReverse(data) {
  var sortedCompanies = data.reverse(function (a, b) {
    if (a.company_name.toUpperCase() > b.company_name.toUpperCase()) {
      return 1;
    }

    if (a.company_name.toUpperCase() < b.company_name.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedCompanies);
  varSortCompany = 0;
}

function sortByPosition(data) {
  var sortedPositions = data.sort(function (a, b) {
    if (a.position.toUpperCase() > b.position.toUpperCase()) {
      return 1;
    }

    if (a.position.toUpperCase() < b.position.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedPositions);
  varSortPosition = 1;
}

function sortByPositionReverse(data) {
  var sortedPositions = data.reverse(function (a, b) {
    if (a.position.toUpperCase() > b.position.toUpperCase()) {
      return 1;
    }

    if (a.position.toUpperCase() < b.position.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedPositions);
  varSortPosition = 0;
}

function sortByInterest(data) {
  var sortedInterests = data.sort(function (a, b) {
    if (a.interest > b.interest) {
      return 1;
    }

    if (a.interest < b.interest) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedInterests);
  varSortInterest = 1;
}

function sortByInterestReverse(data) {
  var sortedInterests = data.reverse(function (a, b) {
    if (a.interest > b.interest) {
      return 1;
    }

    if (a.interest < b.interest) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedInterests);
  varSortInterest = 0;
} //search contacts


search.addEventListener('click', function () {
  return getSearchResults();
});
searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') getSearchResults();
});
searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Backspace' && searchInput.value === '') getSearchResults();
});

function getSearchResults() {
  var search, options, response, data;
  return regeneratorRuntime.async(function getSearchResults$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          //espacio apellido?
          console.log(JSON.parse(sessionStorage.getItem('Token')));
          search = {
            search_value: searchInput.value
          };
          options = {
            method: 'POST',
            body: JSON.stringify(search),
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token'))),
              "Content-Type": "application/json"
            }
          };
          _context4.next = 5;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/search', options));

        case 5:
          response = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context4.sent;
          console.log(data);
          renderResults(data);
          dataCheckbox = data;
          /* checkboxAll.addEventListener('click', () => checkboxAllFunction(data)) */

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
} //select contacts 


function selectContact(checkbox, info, data, row) {
  if (checkbox.classList == 'far fa-square u-item select') {
    check(checkbox, info, data, row);
  } else if (checkbox.classList == 'fas fa-check-square u-item select') {
    uncheck(checkbox, info, data, row);
  }
}

function check(checkbox, info, data, row) {
  checkbox.classList = 'fas fa-check-square u-item select';
  row.style.backgroundColor = 'rgba(142, 199, 252, 0.5)';
  contIdArray = contIdArray.concat(info.contactId);
  console.log(contIdArray);
  contactCounter(contIdArray);
  allContacts(data);
}

function uncheck(checkbox, info, data, row) {
  checkbox.classList = 'far fa-square u-item select';
  row.style.backgroundColor = 'white';
  var index = contIdArray.indexOf(info.contactId);
  contIdArray.splice(index, 1);
  console.log(contIdArray);
  contactCounter(contIdArray);
  allContacts(data);
}

function contactCounter(contIdArray) {
  contCounter.innerText = "".concat(contIdArray.length, " seleccionados");

  if (contIdArray.length !== 0) {
    counterAndDelete.classList.remove('hidden');
  } else if (contIdArray.length === 0) {
    counterAndDelete.classList.add('hidden');
  }
}

function allContacts(data) {
  if (contIdArray.length === data.length) {
    checkboxAll.classList = 'fas fa-check-square';
    varCheckboxAll = 'selected';
  } else if (contIdArray.length !== 0 && contIdArray.length !== data.length) {
    checkboxAll.classList = 'fas fa-minus-square';
    varCheckboxAll = 'indeterminate';
  } else if (contIdArray.length === 0) {
    checkboxAll.classList = 'far fa-square';
    varCheckboxAll = 'unselected';
  }
}

function checkboxAllFunction(data) {
  console.log(varCheckboxAll);
  var allConts = document.querySelectorAll('.select');
  var rowContact = document.querySelectorAll('.row-contact');

  if (
  /* checkboxAll.classList == 'far fa-square' || */
  varCheckboxAll === 'unselected') {
    contIdArray = [];
    console.log('no seleccionado a seleccionado');
    checkboxAll.classList = 'fas fa-check-square'; //seleccionar todos

    /* console.log(allConts) */

    allConts.forEach(function (element) {
      element.classList = 'fas fa-check-square u-item select';
    });
    data.forEach(function (element) {
      contIdArray = contIdArray.concat(element.contact_id);
    });
    rowContact.forEach(function (row) {
      return row.style.backgroundColor = 'rgba(142, 199, 252, 0.5)';
    });
    console.log(contIdArray);
    contactCounter(contIdArray);
    varCheckboxAll = 'selected';
    console.log(varCheckboxAll);
  } else if (
  /* checkboxAll.classList == 'fas fa-check-square' || checkboxAll.classList == 'fas fa-minus-square' || */
  varCheckboxAll === 'selected') {
    console.log('seleccionado a no seleccionado');
    checkboxAll.classList = 'far fa-square'; //desseleccionar todos

    contIdArray = [];
    console.log(contIdArray);
    allConts.forEach(function (element) {
      element.classList = 'far fa-square u-item select';
    });
    rowContact.forEach(function (row) {
      return row.style.backgroundColor = 'white';
    });
    contactCounter(contIdArray);
    varCheckboxAll = 'unselected';
    console.log(varCheckboxAll);
  } else if (
  /* checkboxAll.classList == 'fas fa-minus-square' */
  varCheckboxAll === 'indeterminate') {
    console.log('indeterminado a no seleccionado');
    checkboxAll.classList = 'far fa-square'; //desseleccionar seleccionados

    contIdArray = [];
    console.log(contIdArray);
    allConts.forEach(function (element) {
      element.classList = 'far fa-square u-item select';
    });
    rowContact.forEach(function (row) {
      return row.style.backgroundColor = 'white';
    });
    contactCounter(contIdArray);
    varCheckboxAll = 'unselected';
  }
}