sessionStorage.clear()
let varSect = 'log'
const submit = document.getElementById('submit')
const username = document.getElementById('username')
const password = document.getElementById('password')
const login = document.getElementById('login')
const usersSection = document.getElementById('usersSection')
const headUs = document.getElementById('headUs')
const contacts = document.getElementById('contacts')
const companies = document.getElementById('companies')
const users = document.getElementById('users')
const locations = document.getElementById('location')
const locationSection = document.getElementById('locationSection')
const companiesSection = document.getElementById('companiesSection')
const contactsSection = document.getElementById('contactsSection')
const regionList = document.getElementById('regionList')
const addRegBtn = document.getElementById('addRegBtn')
const locContainer = document.getElementById('locContainer')
const body = document.querySelector('body')
const darkImage = document.getElementById('darkImage')

submit.addEventListener('click', (event) => {
    event.preventDefault()
    loginFunction()
    //funcion nueva pantalla
})

async function loginFunction() {
    const user = {
        username: username.value,
        password: password.value,
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch('http://localhost:3000/users/login', options)
    const data = await response.json()
    if (response.status === 200) {
        console.log(data)
        saveToken(data)
        login.classList.add('none')
        varSect = 'noLog'
        //section que aparece luego de login
        usersSection.classList.remove('none')
        getUsers()
    }
}

function saveToken(data) {
    sessionStorage.setItem('Token', JSON.stringify(data))
}

async function getUsers() {
    console.log(JSON.parse(sessionStorage.getItem('Token')))
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/users', options)
    const data = await response.json()
    console.log(data)
    const usersList = document.createElement('div')

    data.forEach(element => {
        const info = {
            userId: element.user_id,
            firstname: element.firstname,
            lastname: element.lastname,
            email: element.email,
            perfil: element.perfil
        }
        console.log(element)
        const row = document.createElement('div')
        const user = document.createElement('div')
        const email = document.createElement('div')
        const perfil = document.createElement('div')
        const actions = document.createElement('div')
        const ellipsis = document.createElement('i')
        const trash = document.createElement('i')
        const pen = document.createElement('i')

        user.innerText = info.firstname + ' ' + info.lastname
        email.innerText = info.email
        perfil.innerText = info.perfil
   
        usersList.classList.add('users-list')
        row.classList.add('row-user')
        user.classList.add('u-item')        
        email.classList.add('u-item')     
        perfil.classList.add('u-item') 
        actions.classList = 'u-item action'
        ellipsis.classList = 'fas fa-ellipsis-h'
        trash.classList = 'fas fa-trash none'
        pen.classList = 'fas fa-pen none'

        actions.appendChild(ellipsis)
        actions.appendChild(trash)
        actions.appendChild(pen)
        usersList.appendChild(row)
        row.appendChild(user)
        row.appendChild(email)
        row.appendChild(perfil)
        row.appendChild(actions)
        usersSection.appendChild(usersList)

        row.addEventListener('mouseover', () => hoverRow(ellipsis, trash, pen))
        row.addEventListener('mouseout', () => outRow(ellipsis, trash, pen))

        trash.addEventListener('click', () => deleteUser(info, usersList))
        pen.addEventListener('click', () => editUser(info, usersList))
    })
}

function hoverRow(ellipsis, trash, pen) {
    ellipsis.classList.add('none')
    trash.classList.remove('none')
    pen.classList.remove('none')
}

function outRow(ellipsis, trash, pen) {
    ellipsis.classList.remove('none')
    trash.classList.add('none')
    pen.classList.add('none')
}

async function deleteUser(info, usersList) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/users/${info.userId}`, options)
    const data = await response.json()
    console.log(data)
    usersList.remove()
    getUsers()
}

async function editUser(info, usersList) {  //esta funcion la voy a hacer luego, para ver
    const options = {                   //primero como se hace en contactos, hacer
        method: 'PUT',                  //diseño correspondiente y generar json para el body
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/users/${info.userId}`, options)
    const data = await response.json()
    console.log(data)
    usersList.remove()
    getUsers()
}

contacts.addEventListener('click', () => {
    if(varSect !== 'log') {
        contacts.classList.add('bold')
        companies.classList.remove('bold')
        users.classList.remove('bold')
        locations.classList.remove('bold')

        contactsSection.classList.remove('none')
        companiesSection.classList.add('none')
        usersSection.classList.add('none')
        locationSection.classList.add('none')
    }
})

companies.addEventListener('click', () => {
    if(varSect !== 'log') {
        contacts.classList.remove('bold')
        companies.classList.add('bold')
        users.classList.remove('bold')
        locations.classList.remove('bold')

        contactsSection.classList.add('none')
        companiesSection.classList.remove('none')
        usersSection.classList.add('none')
        locationSection.classList.add('none')
    }
})

users.addEventListener('click', () => {
    if(varSect !== 'log') {
        contacts.classList.remove('bold')
        companies.classList.remove('bold')
        users.classList.add('bold')
        locations.classList.remove('bold')

        contactsSection.classList.add('none')
        companiesSection.classList.add('none')
        usersSection.classList.remove('none')
        locationSection.classList.add('none')

        usersList.remove()
        getUsers()
    }
})

locations.addEventListener('click', () => {
    if(varSect !== 'log') {
        contacts.classList.remove('bold')
        companies.classList.remove('bold')
        users.classList.remove('bold')
        locations.classList.add('bold')
    
        contactsSection.classList.add('none')
        companiesSection.classList.add('none')
        usersSection.classList.add('none')
        locationSection.classList.remove('none')

        getLocations()
    }
})

async function getLocations() {
    regionList.innerHTML = ''
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/regionsCountriesCities', options)
    const data = await response.json()
    console.log(data)
    
    data.forEach(reg => {
        const region = document.createElement('li')
        const countryList = document.createElement('ul')
        const btnAddCountry = document.createElement('button')
        const regContainer = document.createElement('div')
        const regTitle = document.createElement('h4')

        regTitle.innerText = reg.region_name
        btnAddCountry.innerText = 'Add country'

        region.classList.add('l-item')
        btnAddCountry.classList = 'btn add'
        regContainer.classList.add('reg-container')
        regTitle.classList.add('reg-title')

        regContainer.appendChild(regTitle)
        regContainer.appendChild(btnAddCountry)
        region.appendChild(regContainer)
        region.appendChild(countryList)
        regionList.appendChild(region)

        reg.countries.forEach(count => {
            const country = document.createElement('li')
            const countContainer = document.createElement('div')
            const countryAndBtn = document.createElement('div')
            const countTitle = document.createElement('h5')
            const btnEditCountry = document.createElement('button')
            const btnDeleteCountry = document.createElement('button')
            const btnAddCity = document.createElement('button')
            const cityList = document.createElement('ul')

            countTitle.innerText = count.country_name
            btnEditCountry.innerText = 'Edit'
            btnDeleteCountry.innerText = 'Delete'
            btnAddCity.innerText = 'Add city'

            country.classList.add('l-item')
            btnEditCountry.classList = 'btn edit'
            btnDeleteCountry.classList = 'btn delete'
            btnAddCity.classList = 'btn add'
            countTitle.classList.add('count-title')
            countContainer.classList.add('count-container')
            countryAndBtn.classList.add('count-btn')

            countryAndBtn.appendChild(countTitle)
            countryAndBtn.appendChild(btnEditCountry)
            countryAndBtn.appendChild(btnDeleteCountry)
            countContainer.appendChild(countryAndBtn)
            countContainer.appendChild(btnAddCity)
            country.appendChild(countContainer)
            country.appendChild(cityList)
            countryList.appendChild(country)

            count.cities.forEach(cit => {
                const city = document.createElement('li')
                const cityTitle = document.createElement('h6')
                const btnEditCity = document.createElement('button')
                const btnDeleteCity = document.createElement('button')

                cityTitle.innerText = cit.city_name
                btnEditCity.innerText = 'Edit'
                btnDeleteCity.innerText = 'Delete'

                city.classList = 'l-item city-container'
                cityTitle.classList.add('city-title')
                btnEditCity.classList = 'btn edit'
                btnDeleteCity.classList = 'btn delete'

                city.appendChild(cityTitle)
                city.appendChild(btnEditCity)
                city.appendChild(btnDeleteCity)
                cityList.appendChild(city)
            })
        })
    })
}

addRegBtn.addEventListener('click', () => {
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImage.classList.remove('none')
    addRegion()
})

async function addRegion() {
    /* const windowAddRegion = document.createElement('div')

    windowAddRegion.classList.add('window-add-reg')

    locationSection.appendChild(windowAddRegion) */


}


/* const user = {
    username: username.value,
    password: password.value,
}
const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        "Content-Type": "application/json"
    }
}
const response = await fetch('http://localhost:3000/users/login', options)
const data = await response.json()
if (response.status === 200) {
    console.log(data)
    saveToken(data)
    login.classList.add('none')
    varSect = 'noLog'
    //section que aparece luego de login
    usersSection.classList.remove('none')
    getUsers()
} */