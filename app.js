const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

app.listen(process.env.PORT || 3000, () => console.log('server started'))