"use strict";

contacts.addEventListener('click', function () {
  getContacts();
});

function getContacts() {
  var options, response, data, contactsList;
  return regeneratorRuntime.async(function getContacts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(JSON.parse(sessionStorage.getItem('Token')));
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/contacts', options));

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context2.sent;
          console.log(data);
          contactsList = document.createElement('div');
          data.forEach(function _callee(element) {
            var info, row, checkbox, contact, country, company, position, preferredChannel, interest, actions, ellipsis, trash, pen, progressBar;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
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
                    console.log(element);
                    row = document.createElement('div');
                    checkbox = document.createElement('i');
                    contact = document.createElement('div');
                    country = document.createElement('div');
                    company = document.createElement('div');
                    position = document.createElement('div');
                    preferredChannel = document.createElement('div');
                    interest = document.createElement('div');
                    /* const percentage = document.createElement('label')
                    const progress = document.createElement('progress') */

                    actions = document.createElement('div');
                    ellipsis = document.createElement('i');
                    trash = document.createElement('i');
                    pen = document.createElement('i');
                    contact.innerHTML = "<p>".concat(info.firstname, " ").concat(info.lastname, "</p><p class=\"grey-info\">").concat(info.email, "</p>");
                    country.innerHTML = "<p>".concat(info.countryName, "</p><p class=\"grey-info\">").concat(info.regionName, "</p>");
                    company.innerText = info.companyName;
                    position.innerText = info.position;
                    /* preferredChannel.innerText = info.preferredChannel[0].channel_name */

                    /* interest.innerText = info.interest + '%' */

                    /* interest.innerHTML = await `  <label for="progressBar">${info.interest}%</label>
                                            <progress id="progressBar" class="progress" max="100" value=${info.interest}>${info.interest}%</progress>` */

                    /* const progressBar = document.getElementById('progressBar')
                    if(0 <= info.interest <= 25) {
                        progressBar.style.color = '#1CC1F5'
                    } else if(25 <= info.interest <= 50) {
                        progressBar.style.color = '#FFC700'
                    } */

                    info.preferredChannel.map(function (element) {
                      //esto no es obligatorio
                      var channel = document.createElement('div');
                      channel.innerText = element.channel_name;
                      channel.classList.add('channel');
                      preferredChannel.appendChild(channel);
                    });
                    /* percentage.innerHTML = `${info.interest}%`
                    progress.innerText = `${info.interest}%` */

                    contactsList.classList.add('users-list');
                    row.classList.add('row-contact');
                    contact.classList = 'u-item col-item';
                    country.classList = 'u-item col-item';
                    company.classList.add('u-item');
                    position.classList.add('u-item');
                    preferredChannel.classList.add('u-item');
                    interest.classList.add('u-item');
                    /* percentage.classList.add('')      */

                    /* progress.classList.add('progress')   */

                    checkbox.classList = 'far fa-square u-item';
                    actions.classList = 'u-item action';
                    ellipsis.classList = 'fas fa-ellipsis-h';
                    trash.classList = 'fas fa-trash none';
                    pen.classList = 'fas fa-pen none';
                    progressBar = document.getElementById('progressBar');

                    if (+info.interest === 100) {
                      interest.innerHTML = "<label for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
                    } else if (75 <= +info.interest && +info.interest < 100) {
                      interest.innerHTML = "<label for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress orange\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
                    } else if (50 <= +info.interest && +info.interest < 75) {
                      interest.innerHTML = "<label for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress yellow\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
                    } else if (25 <= +info.interest && +info.interest < 50) {
                      console.log('daniela');
                      interest.innerHTML = "<label for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress blue\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
                    }
                    /* interest.appendChild(percentage)
                    interest.appendChild(progress) */


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

                  case 51:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}