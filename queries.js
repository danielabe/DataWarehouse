const { QueryTypes } = require("sequelize")
const { db } = require("./db")
const jwt = require('jsonwebtoken')

const authorizationPassword = 'tmo$Q$bG5xR56'

//users
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
    INSERT INTO users (firstname, lastname, email, password)
    VALUES (:firstname, :lastname, :email, :password)
    `, {
        replacements: newUser,
        type: QueryTypes.INSERT
    })
    console.log(inserted)
    const { firstname , lastname, email  } = newUser
    res.status(201).json(Object.assign({}, { user_id: inserted[0] } , 
        { firstname: firstname , lastname: lastname, email: email}, {perfil: "Básico"}))
}

async function validateEmailQuery(req, res, next) {
    const email = req.body.email
    const emails = await db.query(`SELECT email FROM users`, {
        type: QueryTypes.SELECT
    })
    const emailsArray = emails.map(user => user.email)
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

async function modifyUser(userId, req, res) {
    const user = await db.query(`SELECT * FROM users WHERE user_id = ?`, {
        replacements: [userId],
        type: QueryTypes.SELECT 
    })
    const password = req.body.password || user[0].password
    const newUser = {
        user_id: userId,
        firstname: req.body.firstname || user[0].firstname,
        lastname: req.body.lastname || user[0].lastname,
        email: req.body.email || user[0].email,
        perfil: user[0].perfil
    }
    const modified = await db.query(`
    UPDATE users SET firstname = :firstname, lastname = :lastname, email = :email, 
    password = :password WHERE user_id = :user_id
    `, {
        replacements: Object.assign( {}, newUser, {password: password} ),
        type: QueryTypes.UPDATE
    })
    res.status(200).json(newUser)
}

async function deleteUser(userId, req, res) {
    const user = await db.query(`SELECT * FROM users WHERE user_id = ?`, {
        replacements: [userId],
        type: QueryTypes.SELECT 
    })
    const deleted = await db.query(`DELETE FROM users WHERE user_id = ?`, {
        replacements: [userId],
        type: QueryTypes.DELETE
    })
    const {user_id, firstname, lastname, email, perfil} = user[0]
    res.status(200).json({ user_id, firstname, lastname, email, perfil })
}

//regions
async function getRegions(req, res) {
    const regions = await db.query(`SELECT * FROM regions`, { type: QueryTypes.SELECT })
    res.status(200).json(regions)
}

async function validateRegionNameQuery(req, res, next) {
    const region = req.body.region_name
    const regions = await db.query(`SELECT region_name FROM regions`, {
        type: QueryTypes.SELECT
    })
    const regionsArray = regions.map(region => region.region_name)
    if(req.body.region_name.length >= 2 && req.body.region_name.length <= 64) {
        if(regionsArray.every(name => name !== region)) next()
        else res.status(400).send("The region already exists").end()
    } else res.status(400).send("The region name length is wrong").end()
}

async function createRegion(newRegion, req, res) {
    console.log(newRegion)
    const inserted = await db.query(`
    INSERT INTO regions (region_name)
    VALUES (:newRegion)
    `, {
        replacements: {newRegion},
        type: QueryTypes.INSERT
    })
    res.status(201).json(Object.assign({}, { region_id: inserted[0] } , { newRegion }))
}

async function validateRegionIdQuery(req, res, next) {
    const regionId = +req.params.regionId
    const regions = await db.query(`SELECT region_id FROM regions`, {
        type: QueryTypes.SELECT
    })
    const regionsArray = regions.map(id => id.region_id)
    if(regionsArray.includes(regionId)) next()
    else res.status(404).send("The region does not exist").end()
}

async function getRegion(regionId, req, res) {
    const region = await db.query(`
    SELECT * FROM regions WHERE region_id = ?
    `, { 
        replacements: [regionId],
        type: QueryTypes.SELECT 
    })
    res.status(200).json(region[0])
}

module.exports = { selectUserLogin, validateLoginQuery, getUsers, createUser, 
    validateEmailQuery, validateUserIdQuery, getUser, modifyUser, deleteUser, 
    getRegions, createRegion, validateRegionNameQuery, validateRegionIdQuery, 
    getRegion }