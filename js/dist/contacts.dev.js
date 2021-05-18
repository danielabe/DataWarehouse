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
var dltCtcBtn = document.getElementById('dltCtcBtn');
var newCntBtn = document.getElementById('newCntBtn');
var company = document.getElementById('company');
var selectCompany = document.getElementById('selectCompany');
var compLbl = document.getElementById('compLbl');
var regionSelect = document.getElementById('regionSelect');
var regionsList = document.getElementById('regionsList');
var countrySelect = document.getElementById('countrySelect');
var countriesList = document.getElementById('countriesList');
var citySelect = document.getElementById('citySelect');
var citiesList = document.getElementById('citiesList');
var address = document.getElementById('address');
var interestSelect = document.getElementById('interestSelect');
var interestsList = document.getElementById('interestsList');
var telephone = document.getElementById('telephone');
var selectTelephone = document.getElementById('selectTelephone');
var prefTelephoneList = document.getElementById('prefTelephoneList');
var whatsapp = document.getElementById('whatsapp');
var selectWhatsapp = document.getElementById('selectWhatsapp');
var prefWhatsappList = document.getElementById('prefWhatsappList');
var instagram = document.getElementById('instagram');
var selectInstagram = document.getElementById('selectInstagram');
var prefInstagramList = document.getElementById('prefInstagramList');
var facebook = document.getElementById('facebook');
var selectFacebook = document.getElementById('selectFacebook');
var prefFacebookList = document.getElementById('prefFacebookList');
var linkedin = document.getElementById('linkedin');
var selectLinkedin = document.getElementById('selectLinkedin');
var prefLinkedinList = document.getElementById('prefLinkedinList');
var cancelContact = document.getElementById('cancelContact');
var closeNewCtc = document.getElementById('closeNewCtc');
var darkImageAddCtc = document.getElementById('darkImageAddCtc');
var saveContact = document.getElementById('saveContact');
var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var position = document.getElementById('position');
var email = document.getElementById('email');
var contIdArray = [];
var dataCheckbox = [];
var channelsDB = [];
var varSortName = 0;
var varSortCountry = 0;
var varSortCompany = 0;
var varSortPosition = 0;
var varSortInterest = 0;
var varDelete = 0;
var varSelectCompany = 0;
var varSelectRegion = 0;
var varSelectCountry = 0;
var varEnableCountry = 0;
var varEnableCity = 0;
var varSelectCity = 0;
var varSelectInterest = 0;
var varPrefTel = 0;
var varPrefWsp = 0;
var varPrefInst = 0;
var varPrefFace = 0;
var varPrefLink = 0;
var varEnablePrefT = 0;
var varEnablePrefW = 0;
var varEnablePrefI = 0;
var varEnablePrefF = 0;
var varEnablePrefL = 0;
var varRegId;
var varCountId;
var varCityId;
var varCompanyId = null;
var varCheckboxAll = 'unselected'; //show contacts 

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

            checkAfterSortAndSearch(data);
          });
          sortCountry.addEventListener('click', function () {
            if (varSortCountry === 0) {
              sortByCountry(data);
            } else if (varSortCountry === 1) {
              sortByCountryReverse(data);
            }

            checkAfterSortAndSearch(data);
          });
          sortCompany.addEventListener('click', function () {
            if (varSortCompany === 0) {
              sortByCompany(data);
            } else if (varSortCompany === 1) {
              sortByCompanyReverse(data);
            }

            checkAfterSortAndSearch(data);
          });
          sortPosition.addEventListener('click', function () {
            if (varSortPosition === 0) {
              sortByPosition(data);
            } else if (varSortPosition === 1) {
              sortByPositionReverse(data);
            }

            checkAfterSortAndSearch(data);
          });
          sortInterest.addEventListener('click', function () {
            if (varSortInterest === 0) {
              sortByInterest(data);
            } else if (varSortInterest === 1) {
              sortByInterestReverse(data);
            }

            checkAfterSortAndSearch(data);
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}

function checkAfterSortAndSearch(data) {
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
    /* contactsList.innerHTML = '' */

    if (varDelete === 0) {
      deleteContact(info, contactsList);
    } else if (varDelete === 1) {
      deleteContacts();
    }
  });
}

function deleteContact(info
/* , contactsList */
) {
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
          checkAfterSortAndSearch(); //no se si funciona el data, con o sin data va igual, no se si es correcto

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}

dltCtcBtn.addEventListener('click', function () {
  varDelete = 1;
  modalDelete();
});

function deleteContacts() {
  contIdArray.forEach(function _callee2(ctc) {
    var info, options, response, data;
    return regeneratorRuntime.async(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(ctc);
            info = {
              contactId: ctc
            };
            options = {
              method: 'DELETE',
              headers: {
                Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
              }
            };
            _context4.next = 5;
            return regeneratorRuntime.awrap(fetch("http://localhost:3000/contacts/".concat(info.contactId), options));

          case 5:
            response = _context4.sent;
            _context4.next = 8;
            return regeneratorRuntime.awrap(response.json());

          case 8:
            data = _context4.sent;
            getContacts();

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  checkAfterSortAndSearch(); //no se si funciona el data, con o sin data va igual, no se si es correcto
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
  return regeneratorRuntime.async(function getSearchResults$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
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
          _context5.next = 5;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/search', options));

        case 5:
          response = _context5.sent;
          _context5.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context5.sent;
          console.log(data);
          renderResults(data);
          dataCheckbox = data;
          checkAfterSortAndSearch(data);
          /* checkboxAll.addEventListener('click', () => checkboxAllFunction(data)) */

        case 13:
        case "end":
          return _context5.stop();
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
} //add contact


newCntBtn.addEventListener('click', function () {
  /* window.scrollTo(0, 0) */

  /* body.classList.add('modal') */
  darkImageAddCtc.classList.remove('none');
  getAllChannels();
});

function getAllChannels() {
  var options, response, data, chanArray, chansArray;
  return regeneratorRuntime.async(function getAllChannels$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context6.next = 3;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/channels', options));

        case 3:
          response = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context6.sent;
          data.map(function (element) {
            channelsDB = channelsDB.concat({
              channelName: element.channel_name,
              channelId: element.channel_id
            });
          });
          console.log(channelsDB);
          chanArray = document.querySelectorAll('.s-channel');
          chansArray = document.querySelectorAll('.chan');
          chansArray.forEach(function (el, i) {
            el.addEventListener('click', function () {
              return console.log(channelsDB[i].channelId);
            });
          });
          chanArray.forEach(function (el, i) {
            el.innerText = channelsDB[i].channelName;
            /* el.addEventListener('click', () => console.log(channelsDB[i].channelId)) */
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  });
} //select company


company.addEventListener('click', function () {
  if (varSelectCompany === 0) {
    getCompanies();
  } else if (varSelectCompany === 1) {
    selectCompany.classList.add('none');
    selectCompany.innerHTML = '';
    compLbl.style.top = '0px';
    varSelectCompany = 0;
  }
});

function getCompanies() {
  var options, response, data;
  return regeneratorRuntime.async(function getCompanies$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context7.next = 3;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/companies', options));

        case 3:
          response = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context7.sent;
          renderSelectCompanies(data);

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function renderSelectCompanies(data) {
  varSelectCompany = 1;
  selectCompany.classList.remove('none');
  var hcomp = (data.length * 24 + 6) / 2;
  console.log(hcomp);
  compLbl.style.top = "".concat(hcomp, "px");
  data.forEach(function (element) {
    var info = {
      companyId: element.company_id,
      companyName: element.company_name,
      cityId: element.city_id,
      cityName: element.city_name,
      countryId: element.country_id,
      countryName: element.country_name,
      regionId: element.region_id,
      regionName: element.region_name
    };
    var companyItem = document.createElement('li');
    companyItem.innerText = info.companyName;
    companyItem.classList.add('sug-comp');
    selectCompany.appendChild(companyItem);
    companyItem.addEventListener('click', function () {
      return selectCompanyFunction(info);
    });
  });
}

function selectCompanyFunction(info) {
  selectCompany.classList.add('none');
  selectCompany.innerHTML = '';
  compLbl.style.top = '0px';
  company.innerHTML = "".concat(info.companyName, "<i class=\"fas fa-caret-down\"></i>");
  varSelectCompany = 0;
  varCompanyId = info.companyId;
} //select region


regionSelect.addEventListener('click', function () {
  if (varSelectRegion === 0) {
    getRegions();
  } else if (varSelectRegion === 1) {
    regionsList.classList.add('none');
    regionsList.innerHTML = '';
    varSelectRegion = 0;
  }
});

function getRegions() {
  var options, response, data;
  return regeneratorRuntime.async(function getRegions$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context8.next = 3;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/regions', options));

        case 3:
          response = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context8.sent;
          console.log(data);
          renderSelectRegions(data);

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function renderSelectRegions(data) {
  varSelectRegion = 1;
  regionsList.classList.remove('none');
  /* const hreg = (data.length * 24 + 6) / 2
  console.log(hreg) */

  /* compLbl.style.top = `${hreg}px` */

  data.forEach(function (element) {
    var info = {
      regionId: element.region_id,
      regionName: element.region_name
    };
    var regionItem = document.createElement('li');
    regionItem.innerText = info.regionName;
    regionItem.classList.add('sug-comp');
    regionsList.appendChild(regionItem);
    regionItem.addEventListener('click', function () {
      return selectRegionFunction(info);
    });
  });
}

function selectRegionFunction(info) {
  varSelectRegion = 0;
  regionsList.classList.add('none');
  regionsList.innerHTML = '';
  regionSelect.innerHTML = "".concat(info.regionName, "<i class=\"fas fa-caret-down\"></i>");
  countrySelect.classList.remove('disable');
  citySelect.classList.add('disable');
  address.disabled = true;
  address.classList.add('disable');
  countrySelect.innerHTML = "Seleccionar pa\xEDs<i class=\"fas fa-caret-down\"></i>";
  citySelect.innerHTML = "Seleccionar ciudad<i class=\"fas fa-caret-down\"></i>";
  countriesList.classList.add('none');
  citiesList.classList.add('none');
  varEnableCity = 0;
  varSelectCountry = 0;
  varEnableCountry = 1;
  varRegId = +info.regionId;
  varCountId = null;
  varCityId = null;
} //select country


countrySelect.addEventListener('click', function () {
  if (varEnableCountry === 1) {
    if (varSelectCountry === 0) {
      getCountries();
    } else if (varSelectCountry === 1) {
      countriesList.classList.add('none');
      countriesList.innerHTML = '';
      varSelectCountry = 0;
    }
  }
});

function getCountries() {
  var options, response, data;
  return regeneratorRuntime.async(function getCountries$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context9.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/regions/".concat(varRegId, "/countries"), options));

        case 3:
          response = _context9.sent;
          _context9.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context9.sent;
          console.log(data);
          renderSelectCountries(data);

        case 9:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function renderSelectCountries(data) {
  varSelectCountry = 1;
  countriesList.innerHTML = '';
  countriesList.classList.remove('none');
  /* const hreg = (data.length * 24 + 6) / 2
  console.log(hreg) */

  data.forEach(function (element) {
    var info = {
      countryId: element.country_id,
      countryName: element.country_name
    };
    var countryItem = document.createElement('li');
    countryItem.innerText = info.countryName;
    countryItem.classList.add('sug-comp');
    countriesList.appendChild(countryItem);
    countryItem.addEventListener('click', function () {
      return selectCountryFunction(info);
    });
  });
}

function selectCountryFunction(info) {
  varSelectCountry = 0;
  countriesList.classList.add('none');
  countriesList.innerHTML = '';
  countrySelect.innerHTML = "".concat(info.countryName, "<i class=\"fas fa-caret-down\"></i>");
  citySelect.classList.remove('disable');
  address.disabled = true;
  address.classList.add('disable');
  citySelect.innerHTML = "Seleccionar ciudad<i class=\"fas fa-caret-down\"></i>";
  citiesList.classList.add('none');
  varEnableCity = 1;
  varCountId = +info.countryId;
} //select city


citySelect.addEventListener('click', function () {
  if (varEnableCity === 1) {
    if (varSelectCity === 0) {
      getCities();
    } else if (varSelectCity === 1) {
      citiesList.classList.add('none');
      citiesList.innerHTML = '';
      varSelectCity = 0;
    }
  }
});

function getCities() {
  var options, response, data;
  return regeneratorRuntime.async(function getCities$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context10.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/countries/".concat(varCountId, "/cities"), options));

        case 3:
          response = _context10.sent;
          _context10.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context10.sent;
          console.log(data);
          renderSelectCities(data);

        case 9:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function renderSelectCities(data) {
  varSelectCity = 1;
  citiesList.innerHTML = '';
  citiesList.classList.remove('none'); // const hreg = (data.length * 24 + 6) / 2
  // console.log(hreg)

  data.forEach(function (element) {
    var info = {
      cityId: element.city_id,
      cityName: element.city_name
    };
    var cityItem = document.createElement('li');
    cityItem.innerText = info.cityName;
    cityItem.classList.add('sug-comp');
    citiesList.appendChild(cityItem);
    cityItem.addEventListener('click', function () {
      return selectCityFunction(info);
    });
  });
}

function selectCityFunction(info) {
  varSelectCity = 0;
  citiesList.classList.add('none');
  citiesList.innerHTML = '';
  citySelect.innerHTML = "".concat(info.cityName, "<i class=\"fas fa-caret-down\"></i>");
  address.disabled = false;
  address.classList.remove('disable');
  varCityId = +info.cityId;
} //select interest


interestSelect.addEventListener('click', function () {
  if (varSelectInterest === 0) {
    showInterest();
  } else if (varSelectInterest === 1) {
    interestsList.classList.add('none');
    varSelectInterest = 0;
  }
});

function showInterest() {
  interestsList.classList.remove('none');
  varSelectInterest = 1;
  var intArray = document.querySelectorAll('.int');
  intArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectInterestFunction(element.innerText);
    });
  });
}

function selectInterestFunction(interest) {
  varSelectInterest = 0;
  interestsList.classList.add('none');
  interestSelect.innerHTML = "".concat(interest, "<i class=\"fas fa-caret-down\"></i>");
} //contact channels
//telephone


telephone.addEventListener('keyup', function () {
  return enablePrefTel();
});

function enablePrefTel() {
  if (telephone.value !== '') {
    selectTelephone.classList.remove('disable');
    varEnablePrefT = 1;
  } else if (telephone.value === '') {
    selectTelephone.classList.add('disable');
    selectTelephone.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
    varEnablePrefT = 0;
  }
}

selectTelephone.addEventListener('click', function () {
  if (varEnablePrefT === 1) {
    if (varPrefTel === 0) {
      showPrefTel();
    } else if (varPrefTel === 1) {
      prefTelephoneList.classList.add('none');
      varPrefTel = 0;
    }
  }
});

function showPrefTel() {
  prefTelephoneList.classList.remove('none');
  varPrefTel = 1;
  var prefArray = document.querySelectorAll('.pref-tel');
  prefArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPrefTelFunction(element.innerText);
    });
  });
}

function selectPrefTelFunction(pref) {
  varPrefTel = 0;
  prefTelephoneList.classList.add('none');
  preferenceIcons(pref, selectTelephone);
} //whatsapp


whatsapp.addEventListener('keyup', function () {
  return enablePrefWsp();
});

function enablePrefWsp() {
  if (whatsapp.value !== '') {
    selectWhatsapp.classList.remove('disable');
    varEnablePrefW = 1;
  } else if (whatsapp.value === '') {
    selectWhatsapp.classList.add('disable');
    selectWhatsapp.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
    varEnablePrefW = 0;
  }
}

selectWhatsapp.addEventListener('click', function () {
  if (varEnablePrefW === 1) {
    if (varPrefWsp === 0) {
      showPrefWsp();
    } else if (varPrefWsp === 1) {
      prefWhatsappList.classList.add('none');
      varPrefWsp = 0;
    }
  }
});

function showPrefWsp() {
  prefWhatsappList.classList.remove('none');
  varPrefWsp = 1;
  var prefArray = document.querySelectorAll('.pref-wsp');
  prefArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPrefWspFunction(element.innerText);
    });
  });
}

function selectPrefWspFunction(pref) {
  varPrefWsp = 0;
  prefWhatsappList.classList.add('none');
  preferenceIcons(pref, selectWhatsapp);
} //instagram


instagram.addEventListener('keyup', function () {
  return enablePrefInst();
});

function enablePrefInst() {
  if (instagram.value !== '') {
    selectInstagram.classList.remove('disable');
    varEnablePrefI = 1;
  } else if (instagram.value === '') {
    selectInstagram.classList.add('disable');
    selectInstagram.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
    varEnablePrefI = 0;
  }
}

selectInstagram.addEventListener('click', function () {
  if (varEnablePrefI === 1) {
    if (varPrefInst === 0) {
      showPrefInst();
    } else if (varPrefInst === 1) {
      prefInstagramList.classList.add('none');
      varPrefInst = 0;
    }
  }
});

function showPrefInst() {
  prefInstagramList.classList.remove('none');
  varPrefInst = 1;
  var prefArray = document.querySelectorAll('.pref-inst');
  prefArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPrefInstFunction(element.innerText);
    });
  });
}

function selectPrefInstFunction(pref) {
  varPrefInst = 0;
  prefInstagramList.classList.add('none');
  preferenceIcons(pref, selectInstagram);
} //facebook


facebook.addEventListener('keyup', function () {
  return enablePrefFace();
});

function enablePrefFace() {
  if (facebook.value !== '') {
    selectFacebook.classList.remove('disable');
    varEnablePrefF = 1;
  } else if (facebook.value === '') {
    selectFacebook.classList.add('disable');
    selectFacebook.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
    varEnablePrefF = 0;
  }
}

selectFacebook.addEventListener('click', function () {
  if (varEnablePrefF === 1) {
    if (varPrefFace === 0) {
      showPrefFace();
    } else if (varPrefFace === 1) {
      prefFacebookList.classList.add('none');
      varPrefFace = 0;
    }
  }
});

function showPrefFace() {
  prefFacebookList.classList.remove('none');
  varPrefFace = 1;
  var prefArray = document.querySelectorAll('.pref-face');
  prefArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPrefFaceFunction(element.innerText);
    });
  });
}

function selectPrefFaceFunction(pref) {
  varPrefFace = 0;
  prefFacebookList.classList.add('none');
  preferenceIcons(pref, selectFacebook);
} //linkedin


linkedin.addEventListener('keyup', function () {
  return enablePrefLink();
});

function enablePrefLink() {
  if (linkedin.value !== '') {
    selectLinkedin.classList.remove('disable');
    varEnablePrefL = 1;
  } else if (linkedin.value === '') {
    selectLinkedin.classList.add('disable');
    selectLinkedin.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
    varEnablePrefL = 0;
  }
}

selectLinkedin.addEventListener('click', function () {
  if (varEnablePrefL === 1) {
    if (varPrefLink === 0) {
      showPrefLink();
    } else if (varPrefLink === 1) {
      prefLinkedinList.classList.add('none');
      varPrefLink = 0;
    }
  }
});

function showPrefLink() {
  prefLinkedinList.classList.remove('none');
  varPrefLink = 1;
  var prefArray = document.querySelectorAll('.pref-link');
  prefArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPrefLinkFunction(element.innerText);
    });
  });
}

function selectPrefLinkFunction(pref) {
  varPrefLink = 0;
  prefLinkedinList.classList.add('none');
  preferenceIcons(pref, selectLinkedin);
}

function preferenceIcons(pref, select) {
  if (pref === 'Sin preferencia') {
    select.innerHTML = "".concat(pref, "<i class=\"fas fa-caret-down\"></i>");
  } else if (pref === 'Canal favorito') {
    select.innerHTML = "<i class=\"fas fa-heart\"></i><p>".concat(pref, "</p><i class=\"fas fa-caret-down\"></i>");
  } else if (pref === 'No molestar') {
    select.innerHTML = "<i class=\"fas fa-ban\"></i><p>".concat(pref, "</p><i class=\"fas fa-caret-down\"></i>");
  }
} //close window new contact 


cancelContact.addEventListener('click', function (event) {
  return closeWindowNewContact(event);
});
closeNewCtc.addEventListener('click', function (event) {
  return closeWindowNewContact(event);
});

function closeWindowNewContact(event) {
  event.preventDefault();
  darkImageAddCtc.classList.add('none');
  varCompanyId = null;
  varRegId = null;
  varCountId = null;
  varCityId = null;
} //save contact


saveContact.addEventListener('click', function (event) {
  return addContact(event);
});

function addContact(event) {
  var channels, filteredChannels, contact, options, response, data;
  return regeneratorRuntime.async(function addContact$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          event.preventDefault();
          channels = [{
            channel_id: channelsDB[0].channelId,
            user_account: telephone.value,
            preference: selectTelephone.innerText
          }, {
            channel_id: channelsDB[1].channelId,
            user_account: whatsapp.value,
            preference: selectWhatsapp.innerText
          }, {
            channel_id: channelsDB[2].channelId,
            user_account: instagram.value,
            preference: selectInstagram.innerText
          }, {
            channel_id: channelsDB[3].channelId,
            user_account: facebook.value,
            preference: selectFacebook.innerText
          }, {
            channel_id: channelsDB[4].channelId,
            user_account: linkedin.value,
            preference: selectLinkedin.innerText
          }];
          filteredChannels = [];
          channels.forEach(function (chan) {
            if (chan.user_account !== '') {
              filteredChannels = filteredChannels.concat(chan);
            }
          });
          contact = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            region_id: varRegId,
            country_id: varCountId,
            city_id: varCityId,
            address: address.value,
            company_id: varCompanyId,
            position: position.value,
            interest: +interestSelect.innerText.slice(0, -1),
            preferred_channels: filteredChannels
          };
          options = {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
              "Content-Type": "application/json",
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context11.prev = 6;
          _context11.next = 9;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/contacts', options));

        case 9:
          response = _context11.sent;
          _context11.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context11.sent;
          console.log(data);
          _context11.next = 19;
          break;

        case 16:
          _context11.prev = 16;
          _context11.t0 = _context11["catch"](6);
          return _context11.abrupt("return", _context11.t0);

        case 19:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[6, 16]]);
} //ui kit
//inicio
//nuevo contacto
//editar contacto
//editar canales de contacto
//borrar canales al borrar contacto 
//refrescar datos cargados al cerrar la ventana de nuevo contacto
//actualizar en swagger region y country
//overflow
//si tengo ganas cambiar los id de los canalaes en el html