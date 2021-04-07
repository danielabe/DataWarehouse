const jwt = require('jsonwebtoken')

const authorizationPassword = 'tmo$Q$bG5xR56'

const { validateLoginQuery } = require('./queries.js')

async function validateLogin(req, res, next) {
    await validateLoginQuery(req, res, next)
}

function verifyToken(req, res, next) {
    const fullToken = req.headers.authorization || "0.0.0"
    const token = fullToken.split(' ')[1]
    try {
        jwt.verify(token, authorizationPassword)
        next()
    } catch (error) {
        res.status(401).send(error)
    }
}

function filterAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, authorizationPassword)
    if(user.perfil === "Admin") {
        next()
    } else {
        res.status(403).send("You do not have administrator permissions").end()
    }
}

module.exports = { validateLogin, verifyToken, filterAdmin
}

