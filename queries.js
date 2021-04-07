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

async function getUsers(req, res) {
    const users = await db.query(`
    SELECT user_id, firstname, lastname, email, perfil FROM users
    `, { 
        type: QueryTypes.SELECT 
    })
    res.status(200).json(users)
}

async function createUser(newUser, req, res) {
    const inserted = await db.query(`
    INSERT INTO users (firstname, lastname, email)
    VALUES (:firstname, :lastname, :email)
    `, {
        replacements: newUser,
        type: QueryTypes.INSERT
    })
    const { firstname , lastname, email/*, perfil */ } = newUser
    res.status(201).json(Object.assign({}, { user_id: inserted[0] } , 
        { firstname: firstname , lastname: lastname, email: email/*, perfil: perfil , :lastname, :email, :perfil, :password   , lastname, email, perfil, password*/}))
}

async function validateEmailQuery(req, res, next) {
    const email = req.body.email
    const emails = await db.query(`SELECT email FROM users`, {
        type: QueryTypes.SELECT
    })
    const emailsArray = emails.map(user => user.email)
    console.log(emailsArray)
    if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
        if(emailsArray.every(e => e != email)) next()
        else res.status(400).send("The email already exists").end()
    } else res.status(400).send("The email is wrong").end()
}

async function validateUserIdQuery(req, res, next) {
    const userId = +req.params.userId
    const users = await db.query(`SELECT user_id FROM users`, {
        type: QueryTypes.SELECT
    })
    const usersArray = users.map(id => id.user_id)
    if(usersArray.includes(userId)) next()
    else res.status(404).send("The user does not exist").end()
}

async function getUser(userId, req, res) {
    const user = await db.query(`
    SELECT user_id, firstname, lastname, email, perfil FROM users WHERE user_id = ?
    `, { 
        replacements: [userId],
        type: QueryTypes.SELECT 
    })
    res.status(200).json(user[0])
}

module.exports = { selectUserLogin, validateLoginQuery, getUsers, createUser, validateEmailQuery,
    validateUserIdQuery, getUser }