const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const { selectUserLogin, getUsers } = require('./queries.js')

const { validateLogin, verifyToken, filterAdmin } = require('./functions.js')

app.use(express.json())

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