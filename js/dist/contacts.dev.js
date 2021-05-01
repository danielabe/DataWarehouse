"use strict";

contacts.addEventListener('click', function () {
  getContacts();
});

function getContacts() {
  var options, response, data, contactsList;
  return regeneratorRuntime.async(function getContacts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(JSON.parse(sessionStorage.getItem('Token')));
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/contacts', options));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          console.log(data);
          contactsList = document.createElement('div');
          data.forEach(function (element) {
            var info = {
              contactId: element.contact_id,
              firstname: element.firstname,
              lastname: element.lastname,
              email: element.email,
              cityId: element.city_id,
              cityName: element.city_name,
              countryId: element.country_id,
              countryName: element.country_name,
              companyId: element.company_id,
              companyName: element.company_name,
              position: element.position,
              preferredChannel: element.preferred_channels,
              interest: element.interest
            };
            console.log(element);
            var row = document.createElement('div');
            var checkbox = document.createElement('i');
            var contact = document.createElement('div');
            var country = document.createElement('div');
            var company = document.createElement('div');
            var position = document.createElement('div');
            var preferredChannel = document.createElement('div');
            var interest = document.createElement('div');
            var actions = document.createElement('div');
            var ellipsis = document.createElement('i');
            var trash = document.createElement('i');
            var pen = document.createElement('i');
            contact.innerText = info.firstname + ' ' + info.lastname;
            country.innerText = info.countryName;
            company.innerText = info.companyName;
            position.innerText = info.position;
            preferredChannel.innerText = info.preferred_channels + 'arreglar';
            interest.innerText = info.interest;
            contactsList.classList.add('users-list');
            row.classList.add('row-contact');
            contact.classList.add('u-item');
            country.classList.add('u-item');
            company.classList.add('u-item');
            position.classList.add('u-item');
            preferredChannel.classList.add('u-item');
            interest.classList.add('u-item');
            checkbox.classList = 'far fa-square';
            actions.classList = 'u-item action';
            ellipsis.classList = 'fas fa-ellipsis-h';
            trash.classList = 'fas fa-trash none';
            pen.classList = 'fas fa-pen none';
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
            contactsSection.appendChild(contactsList);
            row.addEventListener('mouseover', function () {
              return hoverRow(ellipsis, trash, pen);
            });
            row.addEventListener('mouseout', function () {
              return outRow(ellipsis, trash, pen);
            });
            trash.addEventListener('click', function () {
              return deleteUser(info, contactsList);
            });
            pen.addEventListener('click', function () {
              return editUser(info, contactsList);
            });
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}