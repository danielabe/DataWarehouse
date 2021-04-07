const express = require('express')
const app = express()
const helmet = require('helmet')
const jwt = require('jsonwebtoken')

const { selectUserLogin, getUsers, createUser } = require('./queries.js')

const { validateLogin, verifyToken, filterAdmin, validateFirstname, validateLastname, 
    validateEmail, validatePassword } = require('./functions.js')

app.use(express.json())
app.use(helmet())

app.listen(process.env.PORT || 3000, () => console.log('server started'))

//login
app.post('/users/login', validateLogin, async (req, res) => {
    const { username, password } = req.body
    selectUserLogin(username, password, req, res)
})

app.use(verifyToken)

//users
app.get('/users', filterAdmin, async (req, res) => {    // Función disponible sólo para admin, chequear
    getUsers(req, res)                                  //si también debe estar disponible para otros usuarios
})

app.post('/users/register', filterAdmin, validateFirstname,  validateLastname, validateEmail, 
    validatePassword, async (req, res) => {
    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }
    createUser(newUser, req, res)
})

/* express-rate-limit, .env, bcrypt
*/