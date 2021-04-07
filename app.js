const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const { selectUserLogin } = require('./queries.js')

const { validateLogin } = require('./functions.js')

app.use(express.json())

app.listen(process.env.PORT || 3000, () => console.log('server started'))

//login
app.post('/users/login', validateLogin, async (req, res) => {
    const { username, password } = req.body
    selectUserLogin(username, password, req, res)
})