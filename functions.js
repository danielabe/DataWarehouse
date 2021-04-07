const jwt = require('jsonwebtoken')

const authorizationPassword = 'tmo$Q$bG5xR56'

const { validateLoginQuery } = require('./queries.js')

async function validateLogin(req, res, next) {
    await validateLoginQuery(req, res, next)
}

module.exports = { validateLogin 
}