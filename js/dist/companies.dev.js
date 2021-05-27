"use strict";

var companiesList = document.getElementById('companiesList'); //show companies

companies.addEventListener('click', function () {
  return getCompanies();
});

function getCompanies() {
  var options, response, data;
  return regeneratorRuntime.async(function getCompanies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          companiesList.innerHTML = ''; //ver si puedo sacar este

          /* console.log(JSON.parse(sessionStorage.getItem('Token'))) */

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
            /* trash.addEventListener('click', () => modalDelete())
            pen.addEventListener('click', () => contactEdition(info)) */

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}