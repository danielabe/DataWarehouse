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
const closeNewRegion = document.getElementById('closeNewRegion')
const msgNReg = document.getElementById('msgNReg')
const darkImageRegions = document.getElementById('darkImageRegions')
const cancelDltRegBtn = document.getElementById('cancelDltRegBtn')
const deleteRegBtn = document.getElementById('deleteRegBtn')

let varRegionId = null

//show regions, countries and cities
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

        btnDeleteRegion.addEventListener('click', () => modalDeleteRegion(reg.region_id))

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

//add region
addRegBtn.addEventListener('click', () => {
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImage.classList.remove('none')
    
    /* newRegion.addEventListener('keyup', () => disabledBtn()) */
})

/* function disabledBtn() {
    if(newRegion.value !== '') {
        saveRegion.classList.add('blue')
    }
    if(newRegion.value === '')
        saveRegion.classList.remove('blue')
} */

saveRegion.addEventListener('click', (event) => addRegion(event))

async function addRegion(event) {
    const region = { region_name: newRegion.value }
    const options = {
        method: 'POST',
        body: JSON.stringify(region),
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    validateRegion()
    try {
        const response = await fetch('http://localhost:3000/regions', options)
        if(response.status === 409) {
            newRegion.classList.add('border-wrong')
            msgNReg.classList.add('visible')
            msgNReg.innerText = 'La región ya existe'
        }
        const data = await response.json()
        console.log(data)
        closeWindowNewRegion(event)
        getLocations()
    } catch(reason) {
        return reason
    }
}

//validate region
function validateRegion() {
    if(newRegion.value === '') {
        newRegion.classList.add('border-wrong')
        msgNReg.classList.add('visible')
        newRegion.addEventListener('keyup', () => {
            if(newRegion.value !== '') {
                newRegion.classList.remove('border-wrong')
                msgNReg.classList.remove('visible')
            }
        })
    }
}

//close window new region
closeNewRegion.addEventListener('click', (event) => closeWindowNewRegion(event))
cancelRegion.addEventListener('click', (event) => closeWindowNewRegion(event))

function closeWindowNewRegion(event) {
    event.preventDefault()
    darkImage.classList.add('none')
    body.classList.remove('modal')
    msgNReg.classList.remove('visible')
    newRegion.classList.remove('border-wrong')

    newRegion.value = ''
    msgNReg.innerText = 'Este campo es obligatorio'
}

//delete region 
function modalDeleteRegion(regionId) {
    console.log(regionId)
    varRegionId = regionId
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageRegions.classList.remove('none')
}

cancelDltRegBtn.addEventListener('click', () => cancelReg())

function cancelReg() {
    body.classList.remove('modal')
    darkImageRegions.classList.add('none')
    varRegionId = null
    console.log(varRegionId)
}

deleteRegBtn.addEventListener('click', () => {
    body.classList.remove('modal')
    darkImageRegions.classList.add('none')
    deleteRegion(varRegionId)
})

async function deleteRegion(regId) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        console.log(varRegionId)
        const response = await fetch(`http://localhost:3000/regions/${regId}`, options)
        const data = await response.json()
        console.log(data)
        cancelReg()
        getLocations()
    } catch(reason) {
        return reason
    }
}