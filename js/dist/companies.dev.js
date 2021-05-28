"use strict";

var companiesList = document.getElementById('companiesList');
var newCompanyBtn = document.getElementById('newCompanyBtn');
var darkImageNewCompany = document.getElementById('darkImageNewCompany');
var closeNewComp = document.getElementById('closeNewComp');
var cancelCompany = document.getElementById('cancelCompany');
var msgCompanyName = document.getElementById('msgCompanyName');
var msgCompanyEmail = document.getElementById('msgCompanyEmail');
var msgCompAddress = document.getElementById('msgCompAddress');
var msgCompTelephone = document.getElementById('msgCompTelephone');
var companySlt = document.getElementById('companySlt');
var saveCompany = document.getElementById('saveCompany');
var companyList = document.getElementById('companyList');
var companyName = document.getElementById('companyName');
var companyEmail = document.getElementById('companyEmail');
var compAddress = document.getElementById('compAddress');
var compTelephone = document.getElementById('compTelephone');
var companyCity = document.getElementById('companyCity');
var varSelectCityComp = 0;
var varCompCityId = null; //show companies

companies.addEventListener('click', function () {
  return showCompanies();
});

function showCompanies() {
  var options, response, data;
  return regeneratorRuntime.async(function showCompanies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          companiesList.innerHTML = ''; //ver si puedo sacar este

          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/companies', options));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          console.log(data);
          renderCompanies(data);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderCompanies(data) {
  companiesList.innerHTML = '';
  data.forEach(function _callee(element) {
    var info, row, company, country, address, telephone, actions, ellipsis, trash, pen;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            info = {
              companyId: element.company_id,
              companyName: element.company_name,
              cityId: element.city_id,
              cityName: element.city_name,
              countryId: element.country_id,
              countryName: element.country_name,
              regionId: element.region_id,
              regionName: element.region_name,
              address: element.address,
              email: element.email,
              telephone: element.telephone
            };
            row = document.createElement('li');
            company = document.createElement('div');
            country = document.createElement('div');
            address = document.createElement('div');
            telephone = document.createElement('div');
            actions = document.createElement('div');
            ellipsis = document.createElement('i');
            trash = document.createElement('i');
            pen = document.createElement('i');
            company.innerHTML = "<p>".concat(info.companyName, "</p><p class=\"grey-info\">").concat(info.email, "</p>");
            country.innerHTML = "<p>".concat(info.countryName, "</p><p class=\"grey-info\">").concat(info.regionName, "</p>");
            address.innerText = info.address;
            telephone.innerText = info.telephone;
            row.classList.add('row-companies');
            company.classList = 'u-item col-item';
            country.classList = 'u-item col-item';
            address.classList = 'u-item col-item comp-item';
            telephone.classList = 'u-item col-item';
            actions.classList = 'u-item action';
            ellipsis.classList = 'fas fa-ellipsis-h';
            trash.classList = 'fas fa-trash none';
            pen.classList = 'fas fa-pen none';
            actions.appendChild(ellipsis);
            actions.appendChild(trash);
            actions.appendChild(pen);
            companiesList.appendChild(row);
            row.appendChild(company);
            row.appendChild(country);
            row.appendChild(address);
            row.appendChild(telephone);
            row.appendChild(actions);
            row.addEventListener('mouseover', function () {
              return hoverRow(ellipsis, trash, pen);
            });
            row.addEventListener('mouseout', function () {
              return outRow(ellipsis, trash, pen);
            });
            trash.addEventListener('click', function () {
              return modalDeleteCompany(info.companyId);
            });
            /* 
            pen.addEventListener('click', () => contactEdition(info)) */

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
} //add company


newCompanyBtn.addEventListener('click', function () {
  window.scrollTo(0, 0);
  body.classList.add('modal');
  darkImageNewCompany.classList.remove('none');
  companyCity.style.top = '0px';
}); //close window new company

cancelCompany.addEventListener('click', function (event) {
  return closeWindowNewCompany(event);
});
closeNewComp.addEventListener('click', function (event) {
  return closeWindowNewCompany(event);
});

function closeWindowNewCompany(event) {
  event.preventDefault();
  companyName.value = '';
  companyEmail.value = '';
  compTelephone.value = '';
  compAddress.value = '';
  companySlt.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>';
  msgCompanyName.innerText = 'Este campo es obligatorio';
  body.classList.remove('modal');
  companyName.classList.remove('border-wrong');
  msgCompanyName.classList.remove('visible');
  companyEmail.classList.remove('border-wrong');
  msgCompanyEmail.classList.remove('visible');
  compAddress.classList.remove('border-wrong');
  msgCompAddress.classList.remove('visible');
  compTelephone.classList.remove('border-wrong');
  msgCompTelephone.classList.remove('visible');
  companySlt.classList.remove('border-wrong');
  darkImageNewCompany.classList.add('none');
  companyList.classList.add('none');
  companyCity.style.top = '0px';
  varCompCityId = null;
  varSelectCityComp = 0;
} //save company


saveCompany.addEventListener('click', function (event) {
  return addCompany(event);
});

function addCompany(event) {
  var company, options, response, data;
  return regeneratorRuntime.async(function addCompany$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          msgEmail.innerText = 'Error en datos ingresados';
          event.preventDefault();
          company = {
            company_name: companyName.value,
            email: companyEmail.value,
            address: compAddress.value,
            telephone: compTelephone.value,
            city_id: varCompCityId
          };
          validateCompanyData(company, companyName, msgCompanyName, companyEmail, msgCompanyEmail, compAddress, msgCompAddress, compTelephone, msgCompTelephone, companySlt, companyList);
          options = {
            method: 'POST',
            body: JSON.stringify(company),
            headers: {
              "Content-Type": "application/json",
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/companies', options));

        case 8:
          response = _context3.sent;

          /* console.log(response.text()) */
          if (response.status === 409) {
            companyName.classList.add('border-wrong');
            msgCompanyName.classList.add('visible');
            msgCompanyName.innerText = 'La empresa ya existe'; //no controlar esto
          }

          _context3.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context3.sent;
          console.log(data);
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](5);
          return _context3.abrupt("return", _context3.t0);

        case 19:
          closeWindowNewCompany(event);

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 16]]);
}

function validateCompanyData(company, compName, msgCom, compEmail, msgEmail, comAddress, msgAddress, compTeleph, msgCompTeleph, compSlt, compList) {
  if (company.company_name === '') {
    compName.classList.add('border-wrong');
    msgCom.classList.add('visible');
    compName.addEventListener('keyup', function () {
      if (compName.value !== '') {
        compName.classList.remove('border-wrong');
        msgCom.classList.remove('visible');
      }
    });
  }

  if (company.email === '' || !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(compEmail.value)) {
    compEmail.classList.add('border-wrong');
    msgEmail.classList.add('visible');
    compEmail.addEventListener('keyup', function () {
      if (compEmail.value !== '' && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(compEmail.value)) {
        compEmail.classList.remove('border-wrong');
        msgEmail.classList.remove('visible');
      }
    });
  }

  if (company.address === '') {
    comAddress.classList.add('border-wrong');
    msgAddress.classList.add('visible');
    comAddress.addEventListener('keyup', function () {
      if (comAddress.value !== '') {
        comAddress.classList.remove('border-wrong');
        msgAddress.classList.remove('visible');
      }
    });
  }

  if (company.telephone === '') {
    compTeleph.classList.add('border-wrong');
    msgCompTeleph.classList.add('visible');
    compTeleph.addEventListener('keyup', function () {
      if (compTeleph.value !== '') {
        compTeleph.classList.remove('border-wrong');
        msgCompTeleph.classList.remove('visible');
      }
    });
  }

  if (company.city_id === undefined || company.city_id === null) {
    compSlt.classList.add('border-wrong');
    compList.addEventListener('click', function () {
      console.log(compSlt.innerText);

      if (compSlt.innerText !== 'Seleccionar ciudad') {
        console.log('//////');
        compSlt.classList.remove('border-wrong');
      }
    });
  }
} //select city 


companySlt.addEventListener('click', function () {
  if (varSelectCityComp === 0) {
    getCitiesComp(companyList, companySlt);
  } else if (varSelectCityComp === 1) {
    companyList.classList.add('none');
    companyCity.style.top = '0px';
    companyList.innerHTML = '';
    varSelectCityComp = 0;
  }
});

function getCitiesComp(citList, citSelect) {
  var options, response, data;
  return regeneratorRuntime.async(function getCitiesComp$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/cities", options));

        case 3:
          response = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context4.sent;
          console.log(data);
          renderSelectCitiesComp(data, citList, citSelect);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function renderSelectCitiesComp(data, citList, citSelect) {
  varSelectCityComp = 1;
  citList.innerHTML = '';
  citList.classList.remove('none');
  var hcit = (data.length * 24 + 6) / 2;
  console.log(hcit);
  companyCity.style.top = "".concat(hcit, "px");
  data.forEach(function (element) {
    var info = {
      cityId: element.city_id,
      cityName: element.city_name
    };
    var cityItem = document.createElement('li');
    cityItem.innerText = info.cityName;
    cityItem.classList.add('sug-comp');
    citList.appendChild(cityItem);
    cityItem.addEventListener('click', function () {
      return selectCityCompFunction(info, citList, citSelect);
    });
  });
}

function selectCityCompFunction(info, citList, citSelect) {
  varSelectCityComp = 0;
  citList.classList.add('none');
  companyCity.style.top = '0px';
  citList.innerHTML = '';
  citSelect.innerHTML = "".concat(info.cityName, "<i class=\"fas fa-caret-down\"></i>");
  varCompCityId = +info.cityId;
} //delete company


var darkImageCompanies = document.getElementById('darkImageCompanies');
var cancelDltCompBtn = document.getElementById('cancelDltCompBtn');
var deleteCompBtn = document.getElementById('deleteCompBtn');
var varCompId = null;
var varEditCompany = 0;

function modalDeleteCompany(companyId) {
  console.log(companyId);
  varCompId = companyId; ///

  window.scrollTo(0, 0);
  body.classList.add('modal');
  darkImageCompanies.classList.remove('none');
}

cancelDltCompBtn.addEventListener('click', function () {
  /* window.scrollTo(0, 0)
  body.classList.add('modal')
  darkImageEditReg.style.visibility = 'visible' */
  cancelDeleteComp();
});

function cancelDeleteComp() {
  if (varEditCompany === 0) {
    console.log('despues de no edition');
    body.classList.remove('modal');
    /* darkImageEditComp.style.visibility = 'hidden'
    darkImageEditComp.classList.add('none') */
  } else if (varEditCompany === 1) {
    console.log('despues de edition');
    window.scrollTo(0, 0);
    body.classList.add('modal');
    /* darkImageEditComp.style.visibility = 'visible'
    darkImageEditComp.classList.remove('none') */
  }

  darkImageCompanies.classList.add('none');
  console.log(varRegionId);
}

function cancelComp() {
  body.classList.remove('modal');
  darkImageCompanies.classList.add('none');
  varCompId = null;
  console.log(varCompId);
}

deleteCompBtn.addEventListener('click', function () {
  body.classList.remove('modal');
  darkImageCompanies.classList.add('none');
  deleteCompany(varCompId);
});

function deleteCompany(compId) {
  var options, response, data;
  return regeneratorRuntime.async(function deleteCompany$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          options = {
            method: 'DELETE',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context5.prev = 1;
          console.log(varRegionId);
          _context5.next = 5;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/companies/".concat(compId), options));

        case 5:
          response = _context5.sent;
          _context5.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context5.sent;
          console.log(data);
          cancelComp();
          showCompanies();
          _context5.next = 17;
          break;

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", _context5.t0);

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 14]]);
}