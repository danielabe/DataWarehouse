const regionList = document.getElementById('regionList')
const addRegBtn = document.getElementById('addRegBtn')
const locContainer = document.getElementById('locContainer')
const body = document.querySelector('body')
const darkImage = document.getElementById('darkImage')
const newRegion = document.getElementById('newRegion')
const saveRegion = document.getElementById('saveRegion')
const cancelRegion = document.getElementById('cancelRegion')
const newRegForm = document.getElementById('newRegForm')
const msgContainer = document.getElementById('msgContainer')

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
        const btnEditRegion = document.createElement('button')
        const btnDeleteRegion = document.createElement('button')
        const btnAddCountry = document.createElement('button')
        const regionAndButtons = document.createElement('div')
        const regContainer = document.createElement('div')
        const regTitle = document.createElement('h4')

        regTitle.innerText = reg.region_name
        btnEditRegion.innerText = 'Edit'
        btnDeleteRegion.innerText = 'Delete'
        btnAddCountry.innerText = 'Add country'

        region.classList.add('l-item')
        btnEditRegion.classList = 'btn edit'
        btnDeleteRegion.classList = 'btn delete'
        btnAddCountry.classList = 'btn add'
        regContainer.classList.add('reg-container')
        regTitle.classList.add('reg-title')
        regionAndButtons.classList.add('reg-btn')

        regionAndButtons.appendChild(regTitle)
        regionAndButtons.appendChild(btnEditRegion)
        regionAndButtons.appendChild(btnDeleteRegion)
        regContainer.appendChild(regionAndButtons)
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
    
    newRegion.addEventListener('keyup', () => disabledBtn())
    
})

function disabledBtn() {
    if(newRegion.value !== '') {
        saveRegion.classList.add('blue')
    }
    if(newRegion.value === '')
        saveRegion.classList.remove('blue')
}

saveRegion.addEventListener('click', () => addRegion())

cancelRegion.addEventListener('click', () => {
    body.classList.remove('modal')
    darkImage.classList.add('none')
})

async function addRegion() {
    const region = { region_name: newRegion.value }

    const options = {
        method: 'POST',
        body: JSON.stringify(region),
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch('http://localhost:3000/regions', options)
        if(response.status === 400) {
            msgContainer.innerHTML = ''
            const msgError = document.createElement('p')
            msgContainer.appendChild(msgError)
            if(newRegion.value.length < 2 || newRegion.value.length > 64) {
                msgError.innerText = 'Nombre incorrecto'
            } else {
                msgError.innerText = 'La región ya existe'
            }
        }
        if(response.status === 201) {
            body.classList.remove('modal')
            darkImage.classList.add('none')
            getLocations()
        }
        const data = await response.json()
        console.log(data)
    } catch(reason) {
        return reason
    }
}