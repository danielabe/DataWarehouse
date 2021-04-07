const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const { db } = require("./db")
const { QueryTypes } = require("sequelize")

app.use(express.json())

app.listen(process.env.PORT || 3000, () => console.log('server started'))

//users
app.get('/users', async (req, res) => {
    
    const users = await db.query(`SELECT * FROM users`, { type: QueryTypes.SELECT })
    res.status(200).json(users)
    
})