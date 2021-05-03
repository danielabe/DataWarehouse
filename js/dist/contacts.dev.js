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
              regionId: element.region_id,
              regionName: element.region_name,
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
            contact.innerHTML = "<p>".concat(info.firstname, " ").concat(info.lastname, "</p><p class=\"grey-info\">").concat(info.email, "</p>");
            country.innerHTML = "<p>".concat(info.countryName, "</p><p class=\"grey-info\">").concat(info.regionName, "</p>");
            company.innerText = info.companyName;
            position.innerText = info.position;
            /* preferredChannel.innerText = info.preferredChannel[0].channel_name */

            /* interest.innerText = info.interest + '%' */

            interest.innerHTML = "  <label for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            /* const progressBar = document.getElementById('progressBar')
            if(0 <= info.interest <= 25) {
                progressBar.style.color = '#1CC1F5'
            } else if(25 <= info.interest <= 50) {
                progressBar.style.color = '#FFC700'
            } */

            console.log('probando ' + info.preferredChannel);
            info.preferredChannel.map(function (element) {
              //esto no es obligatorio
              var channel = document.createElement('div');
              channel.innerText = element.channel_name;
              channel.classList.add('channel');
              preferredChannel.appendChild(channel);
            });
            contactsList.classList.add('users-list');
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