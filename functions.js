const jwt = require('jsonwebtoken')

const authorizationPassword = 'tmo$Q$bG5xR56'

const { validateLoginQuery, validateEmailQuery } = require('./queries.js')

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

function validateFirstname(req, res, next) {
    const firstname = req.body.firstname
    if(firstname.length >= 3 && firstname.length <= 64) next()
    else res.status(400).send("The firstname length is wrong").end()
}

function validateLastname(req, res, next) {
    const lastname = req.body.lastname
    if(lastname.length >= 2 && lastname.length <= 64) next()
    else res.status(400).send("The lastname length is wrong").end()
}

async function validateEmail(req, res, next) {
    await validateEmailQuery(req, res, next)
}

function validatePassword(req, res, next) {
    const password = req.body.password
    if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(password)) next()
    else res.status(400).send("The password is wrong").end()
}
// Minimum 4 characters
// Maximum 15 characters
// At least 1 character
// At least 1 digit
// No blank spaces

module.exports = { validateLogin, verifyToken, filterAdmin, validateFirstname, validateLastname, 
    validateEmail, validatePassword
}

