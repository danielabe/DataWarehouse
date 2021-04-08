const express = require('express')
const app = express()
const helmet = require('helmet')
const jwt = require('jsonwebtoken')

const { selectUserLogin, getUsers, createUser, getUser, modifyUser, deleteUser, getRegions,
    createRegion, getRegion, modifyRegion, deleteRegion, getCountriesRegion,
    getCitiesRegion, getCountries, createCountry, getCountry } = require('./queries.js')

const { validateLogin, verifyToken, filterAdmin, validateFirstname, validateLastname, 
    validateEmail, validatePassword, validateUser, validateUserId, validateFirstnamePut,
    validateLastnamePut, validatePasswordPut, validateRegionName, validateRegionId, 
    validateRegionNamePut, validateCountryName, validateCountryId } = require('./functions.js')

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

app.get('/users/:userId', validateUser, validateUserId, async (req, res) => {
    const userId = +req.params.userId
    getUser(userId, req, res)
}) 

app.put('/users/:userId', validateUser, validateUserId, validateFirstnamePut, 
validateLastnamePut, validatePasswordPut, async (req, res) => {
    const userId = +req.params.userId
    modifyUser(userId, req, res)
})

app.delete('/users/:userId', validateUser, validateUserId, async (req, res) => {
    const userId = +req.params.userId
    deleteUser(userId, req, res)
})

//regions
app.get('/regions', async (req, res) => {    
    getRegions(req, res)                                 
})

app.post('/regions', validateRegionName,  async (req, res) => {
    const newRegion = req.body.region_name
    createRegion(newRegion, req, res)
})

app.get('/regions/:regionId', validateRegionId, async (req, res) => {
    const regionId = +req.params.regionId
    getRegion(regionId, req, res)
}) 

app.put('/regions/:regionId', validateRegionId, validateRegionNamePut, async (req, res) => {
    const regionId = +req.params.regionId
    modifyRegion(regionId, req, res)
})

app.delete('/regions/:regionId', validateRegionId, async (req, res) => {
    const regionId = +req.params.regionId
    deleteRegion(regionId, req, res)
})

app.get('/regions/:regionId/countries', validateRegionId, async (req, res) => {
    const regionId = +req.params.regionId
    getCountriesRegion(regionId, req, res)
}) 

app.get('/regions/:regionId/cities', validateRegionId, async (req, res) => {
    const regionId = +req.params.regionId
    getCitiesRegion(regionId, req, res)
}) 

//countries
app.get('/countries', async (req, res) => {    
    getCountries(req, res)                                 
})

app.post('/countries', validateCountryName, validateRegionId, async (req, res) => {
    const { region_id, country_name } = req.body
    createCountry(country_name, region_id, req, res)
})

app.get('/countries/:countryId', validateCountryId, async (req, res) => {
    const countryId = +req.params.countryId
    getCountry(countryId, req, res)
}) 
/* express-rate-limit, .env, bcrypt
*/