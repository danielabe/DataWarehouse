const { QueryTypes } = require("sequelize")
const { db } = require("./db")
const jwt = require('jsonwebtoken')

const authorizationPassword = 'tmo$Q$bG5xR56'

async function selectUserLogin(username, password, req, res) {
    const user = await db.query(`SELECT * FROM users WHERE email = :username && password = :password`, { 
        replacements: { username, password },
        type: QueryTypes.SELECT 
    })
    const perfil = user[0].perfil
    const user_id = user[0].user_id
    res.status(200).json(jwt.sign({ username, perfil, user_id} , authorizationPassword))
}

async function validateLoginQuery(req, res, next) {
    const { username, password } = req.body
    const user = await db.query(`SELECT * FROM users WHERE email = :username && password = :password`, { 
        replacements: { username, password },
        type: QueryTypes.SELECT 
    })
    if(user[0]) next()
    else res.status(400).send("Invalid credentials").end()
}

module.exports = { selectUserLogin, validateLoginQuery }