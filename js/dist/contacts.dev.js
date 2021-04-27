"use strict";

contacts.addEventListener('click', function () {
  getContacts();
});

function getContacts() {
  var options, response, data;
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

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}