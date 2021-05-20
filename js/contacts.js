const darkImageContacts = document.getElementById('darkImageContacts')
const cancelDltContBtn = document.getElementById('cancelDltContBtn')
const deleteContactBtn = document.getElementById('deleteContactBtn')
const contactsList = document.getElementById('contactsList')
const sortName = document.getElementById('sortName')
const sortCountry = document.getElementById('sortCountry')
const sortCompany = document.getElementById('sortCompany')
const sortPosition = document.getElementById('sortPosition')
const sortInterest = document.getElementById('sortInterest')
const search = document.getElementById('search')
const searchInput = document.getElementById('searchInput')
const checkboxAll = document.getElementById('checkboxAll')
const contCounter = document.getElementById('contCounter')
const counterAndDelete = document.getElementById('counterAndDelete')
const dltCtcBtn = document.getElementById('dltCtcBtn')
const newCntBtn = document.getElementById('newCntBtn')
const company = document.getElementById('company')
const selectCompany = document.getElementById('selectCompany')
const compLbl = document.getElementById('compLbl')
const regionSelect = document.getElementById('regionSelect')
const regionsList = document.getElementById('regionsList')
const countrySelect = document.getElementById('countrySelect')
const countriesList = document.getElementById('countriesList')
const citySelect = document.getElementById('citySelect')
const citiesList = document.getElementById('citiesList')
const address = document.getElementById('address')
const interestSelect = document.getElementById('interestSelect')
const interestsList = document.getElementById('interestsList')
const telephone = document.getElementById('telephone')
const selectTelephone = document.getElementById('selectTelephone')
const prefTelephoneList = document.getElementById('prefTelephoneList')
const whatsapp = document.getElementById('whatsapp')
const selectWhatsapp = document.getElementById('selectWhatsapp')
const prefWhatsappList = document.getElementById('prefWhatsappList')
const instagram = document.getElementById('instagram')
const selectInstagram = document.getElementById('selectInstagram')
const prefInstagramList = document.getElementById('prefInstagramList')
const facebook = document.getElementById('facebook')
const selectFacebook = document.getElementById('selectFacebook')
const prefFacebookList = document.getElementById('prefFacebookList')
const linkedin = document.getElementById('linkedin')
const selectLinkedin = document.getElementById('selectLinkedin')
const prefLinkedinList = document.getElementById('prefLinkedinList')
const cancelContact = document.getElementById('cancelContact')
const closeNewCtc = document.getElementById('closeNewCtc')
const darkImageAddCtc = document.getElementById('darkImageAddCtc')
const saveContact = document.getElementById('saveContact')
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const position = document.getElementById('position')
const email = document.getElementById('email')
const main = document.querySelector('main')
const msgFirst = document.getElementById('msgFirst')
const msgLast = document.getElementById('msgLast')
const msgPos = document.getElementById('msgPos')
const msgEmail = document.getElementById('msgEmail')
const msgAddress = document.getElementById('msgAddress')
const darkImageEditCtc = document.getElementById('darkImageEditCtc')
const closeEditCtc = document.getElementById('closeEditCtc')
const deleteContactEdit = document.getElementById('deleteContactEdit')

let contIdArray = []
let dataCheckbox = []
let channelsDB = []

let varSortName = 0
let varSortCountry = 0
let varSortCompany = 0
let varSortPosition = 0
let varSortInterest = 0
let varDelete = 0
let varSelectCompany = 0
let varSelectRegion = 0
let varSelectCountry = 0
let varEnableCountry = 0
let varEnableCity = 0
let varSelectCity = 0
let varSelectInterest = 0
let varPrefTel = 0
let varPrefWsp = 0
let varPrefInst = 0
let varPrefFace = 0
let varPrefLink = 0
let varEnablePrefT = 0
let varEnablePrefW = 0
let varEnablePrefI = 0
let varEnablePrefF = 0
let varEnablePrefL = 0

let varRegId
let varCountId
let varCityId
let varCompanyId = null

let varCheckboxAll = 'unselected'

//show contacts 
contacts.addEventListener('click', () => {
    getContacts()
})

async function getContacts() {
    contactsList.innerHTML = '' //ver si puedo sacar este
    /* console.log(JSON.parse(sessionStorage.getItem('Token'))) */
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/contacts', options)
    const data = await response.json()
    dataCheckbox = data
    renderResults(data)
    /* checkboxAll.addEventListener('click', () => checkboxAllFunction(data)) */
    varSortName = 0
    sortName.addEventListener('click', () => {
        if(varSortName === 0) {
            sortByName(data)
        } else if(varSortName === 1) {
            sortByNameReverse(data)
        }
        checkAfterSortAndSearch(data) 
    })
    sortCountry.addEventListener('click', () => {
        if(varSortCountry === 0) {
            sortByCountry(data)
        } else if(varSortCountry === 1) {
            sortByCountryReverse(data)
        }
        checkAfterSortAndSearch(data)
    })
    sortCompany.addEventListener('click', () => {
        if(varSortCompany === 0) {
            sortByCompany(data)
        } else if(varSortCompany === 1) {
            sortByCompanyReverse(data)
        }
        checkAfterSortAndSearch(data)
    })
    sortPosition.addEventListener('click', () => {
        if(varSortPosition === 0) {
            sortByPosition(data)
        } else if(varSortPosition === 1) {
            sortByPositionReverse(data)
        }
        checkAfterSortAndSearch(data)
    })
    sortInterest.addEventListener('click', () => {
        if(varSortInterest === 0) {
            sortByInterest(data)
        } else if(varSortInterest === 1) {
            sortByInterestReverse(data)
        }
        checkAfterSortAndSearch(data)
    })
}

function checkAfterSortAndSearch(data) {
    counterAndDelete.classList.add('hidden')
    varCheckboxAll = 'indeterminate'
    /* console.log(varCheckboxAll) */
    checkboxAllFunction(data)
}

checkboxAll.addEventListener('click', () => checkboxAllFunction(dataCheckbox))

function renderResults(data) {
    
    /* checkboxAll.classList = 'fas fa-check-square'
            checkboxAllFunction(data)
     */
    contactsList.innerHTML = ''
    data.forEach(async element => {
        const info = {
            contactId: element.contact_id,
            firstname: element.firstname,
            lastname: element.lastname,
            email: element.email,
            cityId: element.city_id,
            cityName: element.city_name,
            countryId: element.country_id,
            countryName: element.country_name,
            regionId: element.region_id,
            regionName: element.region_name,
            companyId: element.company_id,
            companyName: element.company_name,
            position: element.position,
            preferredChannel: element.preferred_channels,
            interest: element.interest,
            varSelectContact : 0
        }
        
        const row = document.createElement('li')
        const checkbox = document.createElement('i')
        const contact = document.createElement('div')
        const country = document.createElement('div')
        const company = document.createElement('div')
        const position = document.createElement('div')
        const preferredChannel = document.createElement('div')
        const interest = document.createElement('div')
        const actions = document.createElement('div')
        const ellipsis = document.createElement('i')
        const trash = document.createElement('i')
        const pen = document.createElement('i')

        contact.innerHTML = `<p>${info.firstname} ${info.lastname}</p><p class="grey-info">${info.email}</p>`
        country.innerHTML = `<p>${info.countryName}</p><p class="grey-info">${info.regionName}</p>`
        company.innerText = info.companyName
        position.innerText = info.position
        
        info.preferredChannel.map(element => { //esto no es obligatorio
            const channel = document.createElement('div')
            channel.innerText = element.channel_name
            channel.classList.add('channel')
            preferredChannel.appendChild(channel)
        })

        row.classList.add('row-contact')
        contact.classList = 'u-item col-item'        
        country.classList = 'u-item col-item'     
        company.classList.add('u-item')        
        position.classList.add('u-item')        
        preferredChannel.classList.add('u-item')        
        interest.classList.add('u-item')            
        checkbox.classList = 'far fa-square u-item select'
        actions.classList = 'u-item action'
        ellipsis.classList = 'fas fa-ellipsis-h'
        trash.classList = 'fas fa-trash none'
        pen.classList = 'fas fa-pen none'

        if(+info.interest === 100) {
            interest.innerHTML = `<label class="percentage" for="progressBar">${info.interest}%</label>
                                <progress id="progressBar" class="progress" max="100" value=${info.interest}>${info.interest}%</progress>`
        } else if(75 <= +info.interest && +info.interest < 100) {
            interest.innerHTML = `<label class="percentage" for="progressBar">${info.interest}%</label>
                                <progress id="progressBar" class="progress orange" max="100" value=${info.interest}>${info.interest}%</progress>`
        } else if(50 <= +info.interest && +info.interest < 75) {
            interest.innerHTML = `<label class="percentage" for="progressBar">${info.interest}%</label>
                                <progress id="progressBar" class="progress yellow" max="100" value=${info.interest}>${info.interest}%</progress>`
        } else if(25 <= +info.interest && +info.interest < 50) {
            interest.innerHTML = `<label class="percentage" for="progressBar">${info.interest}%</label>
                                <progress id="progressBar" class="progress blue" max="100" value=${info.interest}>${info.interest}%</progress>`
        } else if(0 <= +info.interest && +info.interest < 25) {
            interest.innerHTML = `<label class="percentage" for="progressBar">${info.interest}%</label>
                                <progress id="progressBar" class="progress grey" max="100" value=${info.interest}>${info.interest}%</progress>`
        }

        actions.appendChild(ellipsis)
        actions.appendChild(trash)
        actions.appendChild(pen)
        contactsList.appendChild(row)
        row.appendChild(checkbox)
        row.appendChild(contact)
        row.appendChild(country)
        row.appendChild(company)
        row.appendChild(position)
        row.appendChild(preferredChannel)
        row.appendChild(interest)
        row.appendChild(actions)

        row.addEventListener('mouseover', () => hoverRow(ellipsis, trash, pen))
        row.addEventListener('mouseout', () => outRow(ellipsis, trash, pen))

        trash.addEventListener('click', () => modalDelete(info, contactsList))
        pen.addEventListener('click', () => contactEdition(info))

        checkbox.addEventListener('click', () => selectContact(checkbox, info, data, row))
    })
}

//delete contact
function modalDelete(info, contactsList) {
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageContacts.classList.remove('none')
    
    cancelDltContBtn.addEventListener('click', () => {
        body.classList.remove('modal')
        darkImageContacts.classList.add('none')
    })

    deleteContactBtn.addEventListener('click', () => {
        body.classList.remove('modal')
        darkImageContacts.classList.add('none')
        /* contactsList.innerHTML = '' */
        if(varDelete === 0) {
            deleteContact(info, contactsList)
        } else if (varDelete === 1) {
            deleteContacts()
        }
    })
}

async function deleteContact(info/* , contactsList */) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/contacts/${info.contactId}`, options)
    const data = await response.json()
    /* getContacts() */
    checkAfterSortAndSearch() //no se si funciona el data, con o sin data va igual, no se si es correcto
}

dltCtcBtn.addEventListener('click', () => {
    varDelete = 1
    modalDelete(/* info *//* , contactsList */)
})

function deleteContacts() {
    contIdArray.forEach(async ctc => {
        console.log(ctc)
        const info = {
            contactId: ctc
        }
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
            }
        }
        const response = await fetch(`http://localhost:3000/contacts/${info.contactId}`, options)
        const data = await response.json()
        /* getContacts() */
    })
    checkAfterSortAndSearch() //no se si funciona el data, con o sin data va igual, no se si es correcto
}

//sort columns
function sortByName(data) {
    /* console.log(data) */
    const sortedNames = data.sort(function (a, b) {
        /* console.log(data) */
        if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) { 
            return 1
        }
        if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedNames)
    console.log(sortedNames)
    varSortName = 1
    /* varCheckboxAll = 0 */
}

function sortByNameReverse(data) {
    console.log('dani')
    const sortedNames = data.reverse(function (a, b) {
        console.log(data)
        if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) { 
            return 1
        }
        if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
          return -1
        }
        return 0
    })
    console.log(sortedNames)
    renderResults(sortedNames)
    varSortName = 0
}

function sortByCountry(data) {
    const sortedCountries = data.sort(function (a, b) {
        if (a.country_name.toUpperCase() > b.country_name.toUpperCase()) { 
            return 1
        }
        if (a.country_name.toUpperCase() < b.country_name.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedCountries)
    varSortCountry = 1
}

function sortByCountryReverse(data) {
    const sortedCountries = data.reverse(function (a, b) {
        if (a.country_name.toUpperCase() > b.country_name.toUpperCase()) { 
            return 1
        }
        if (a.country_name.toUpperCase() < b.country_name.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedCountries)
    varSortCountry = 0
}

function sortByCompany(data) {
    const sortedCompanies = data.sort(function (a, b) {
        if (a.company_name.toUpperCase() > b.company_name.toUpperCase()) { 
            return 1
        }
        if (a.company_name.toUpperCase() < b.company_name.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedCompanies)
    varSortCompany = 1
}

function sortByCompanyReverse(data) {
    const sortedCompanies = data.reverse(function (a, b) {
        if (a.company_name.toUpperCase() > b.company_name.toUpperCase()) { 
            return 1
        }
        if (a.company_name.toUpperCase() < b.company_name.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedCompanies)
    varSortCompany = 0
}

function sortByPosition(data) {
    const sortedPositions = data.sort(function (a, b) {
        if (a.position.toUpperCase() > b.position.toUpperCase()) { 
            return 1
        }
        if (a.position.toUpperCase() < b.position.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedPositions)
    varSortPosition = 1
}

function sortByPositionReverse(data) {
    const sortedPositions = data.reverse(function (a, b) {
        if (a.position.toUpperCase() > b.position.toUpperCase()) { 
            return 1
        }
        if (a.position.toUpperCase() < b.position.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedPositions)
    varSortPosition = 0
}

function sortByInterest(data) {
    const sortedInterests = data.sort(function (a, b) {
        if (a.interest > b.interest) { 
            return 1
        }
        if (a.interest < b.interest) {
          return -1
        }
        return 0
    })
    renderResults(sortedInterests)
    varSortInterest = 1
}

function sortByInterestReverse(data) {
    const sortedInterests = data.reverse(function (a, b) {
        if (a.interest > b.interest) { 
            return 1
        }
        if (a.interest < b.interest) {
          return -1
        }
        return 0
    })
    renderResults(sortedInterests)
    varSortInterest = 0
}

//search contacts
search.addEventListener('click', () => getSearchResults())

searchInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') getSearchResults()
})

searchInput.addEventListener('keyup', (event) => {
    if(event.key === 'Backspace' && searchInput.value === '') getSearchResults()
})

async function getSearchResults() { //espacio apellido?
    console.log(JSON.parse(sessionStorage.getItem('Token')))
    const search = {
        search_value: searchInput.value
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(search),
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`,
            "Content-Type": "application/json"
        }
    }
    const response = await fetch('http://localhost:3000/search', options)
    const data = await response.json()
    console.log(data)
    renderResults(data)
    dataCheckbox = data
    checkAfterSortAndSearch(data)
    /* checkboxAll.addEventListener('click', () => checkboxAllFunction(data)) */
}

//select contacts 
function selectContact(checkbox, info, data, row) {
    if(checkbox.classList == 'far fa-square u-item select') {
        check(checkbox, info, data, row)
    } else if(checkbox.classList == 'fas fa-check-square u-item select') { 
        uncheck(checkbox, info, data, row)
    }
}

function check(checkbox, info, data, row) {
    checkbox.classList = 'fas fa-check-square u-item select'
    row.style.backgroundColor = 'rgba(142, 199, 252, 0.5)'
    contIdArray = contIdArray.concat(info.contactId)
    console.log(contIdArray)
    contactCounter(contIdArray)
    allContacts(data)
}

function uncheck(checkbox, info, data, row) {
    checkbox.classList = 'far fa-square u-item select'
    row.style.backgroundColor = 'white'
    const index = contIdArray.indexOf(info.contactId)
    contIdArray.splice(index, 1)
    console.log(contIdArray)
    contactCounter(contIdArray)
    allContacts(data)
}

function contactCounter(contIdArray) {
    contCounter.innerText = `${contIdArray.length} seleccionados`
    if(contIdArray.length !== 0) {
        counterAndDelete.classList.remove('hidden')
    } else if(contIdArray.length === 0) {
        counterAndDelete.classList.add('hidden')
    }
}

function allContacts(data) {
    if(contIdArray.length === data.length) {
        checkboxAll.classList = 'fas fa-check-square'
        varCheckboxAll = 'selected'
    } else if(contIdArray.length !== 0 && contIdArray.length !== data.length) {
        checkboxAll.classList = 'fas fa-minus-square'
        varCheckboxAll = 'indeterminate'
    } else if (contIdArray.length === 0) {
        checkboxAll.classList = 'far fa-square'
        varCheckboxAll = 'unselected'
    }
}

function checkboxAllFunction(data) {
    /* console.log(varCheckboxAll) */
    const allConts = document.querySelectorAll('.select')
    const rowContact = document.querySelectorAll('.row-contact')
    if(/* checkboxAll.classList == 'far fa-square' || */ varCheckboxAll === 'unselected') {
        contIdArray = []
        console.log('no seleccionado a seleccionado')
        checkboxAll.classList = 'fas fa-check-square'
        //seleccionar todos
        /* console.log(allConts) */
        allConts.forEach(element => {
            element.classList = 'fas fa-check-square u-item select'
        })
        data.forEach(element => {
            contIdArray = contIdArray.concat(element.contact_id)
        })
        rowContact.forEach(row => row.style.backgroundColor = 'rgba(142, 199, 252, 0.5)')
        console.log(contIdArray)
        contactCounter(contIdArray)
        varCheckboxAll = 'selected'
        console.log(varCheckboxAll)
    } else if(/* checkboxAll.classList == 'fas fa-check-square' || checkboxAll.classList == 'fas fa-minus-square' || */ varCheckboxAll === 'selected') {
        console.log('seleccionado a no seleccionado')
        checkboxAll.classList = 'far fa-square'
        //desseleccionar todos
        contIdArray = []
        console.log(contIdArray)
        allConts.forEach(element => {
            element.classList = 'far fa-square u-item select'
        })
        rowContact.forEach(row => row.style.backgroundColor = 'white')
        contactCounter(contIdArray)
        varCheckboxAll = 'unselected'
        console.log(varCheckboxAll)

    } else if(/* checkboxAll.classList == 'fas fa-minus-square' */ varCheckboxAll === 'indeterminate') {
        /* console.log('indeterminado a no seleccionado') */
        checkboxAll.classList = 'far fa-square'
        //desseleccionar seleccionados
        contIdArray = []
        /* console.log(contIdArray) */
        allConts.forEach(element => {
            element.classList = 'far fa-square u-item select'
        })
        rowContact.forEach(row => row.style.backgroundColor = 'white')
        contactCounter(contIdArray)
        varCheckboxAll = 'unselected'
    }
}

//add contact
newCntBtn.addEventListener('click', () => {
    /* window.scrollTo(0, 0) */
    /* body.classList.add('modal') */
    darkImageAddCtc.classList.remove('none')
    main.classList.add('height-add-ctc')
    getAllChannels()
})

async function getAllChannels() {
    channelsDB = []
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/channels', options)
    const data = await response.json()
    data.map(element => {
        channelsDB = channelsDB.concat({channelName: element.channel_name, channelId: element.channel_id})
    })
    console.log(channelsDB)
    const chanArray = document.querySelectorAll('.s-channel')
    const chansArray = document.querySelectorAll('.chan')
    chansArray.forEach((el, i) => {
        el.addEventListener('click', () => console.log(channelsDB[i].channelId))
    })
    chanArray.forEach((el, i) => {
        el.innerText = channelsDB[i].channelName
        /* el.addEventListener('click', () => console.log(channelsDB[i].channelId)) */
    })
}

//select company
company.addEventListener('click', () => {
    if(varSelectCompany === 0) {
        getCompanies()
    } else if(varSelectCompany === 1) {
        selectCompany.classList.add('none')
        selectCompany.innerHTML = ''
        compLbl.style.top = '0px'
        varSelectCompany = 0
    }
})

async function getCompanies() {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/companies', options)
    const data = await response.json()
    renderSelectCompanies(data)
}

function renderSelectCompanies(data) {
    varSelectCompany = 1
    selectCompany.classList.remove('none')

    const hcomp = (data.length * 24 + 6) / 2
    console.log(hcomp)
    compLbl.style.top = `${hcomp}px`

    data.forEach(element => {
        const info = {
            companyId: element.company_id,
            companyName: element.company_name,
            cityId: element.city_id,
            cityName: element.city_name,
            countryId: element.country_id,
            countryName: element.country_name,
            regionId: element.region_id,
            regionName: element.region_name
        }
        const companyItem = document.createElement('li')
        companyItem.innerText = info.companyName
        companyItem.classList.add('sug-comp')
        selectCompany.appendChild(companyItem)

        companyItem.addEventListener('click', () => selectCompanyFunction(info))
    })
}

function selectCompanyFunction(info) {
    selectCompany.classList.add('none')
    selectCompany.innerHTML = ''
    compLbl.style.top = '0px'
    company.innerHTML = `${info.companyName}<i class="fas fa-caret-down"></i>`
    varSelectCompany = 0
    varCompanyId = info.companyId
}

//select region
regionSelect.addEventListener('click', () => {
    if(varSelectRegion === 0) {
        getRegions()
    } else if(varSelectRegion === 1) {
        regionsList.classList.add('none')
        regionsList.innerHTML = ''
        varSelectRegion = 0
    }
})

async function getRegions() {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/regions', options)
    const data = await response.json()
    console.log(data)
    renderSelectRegions(data)
}

function renderSelectRegions(data) {
    varSelectRegion = 1
    regionsList.classList.remove('none')
    /* const hreg = (data.length * 24 + 6) / 2
    console.log(hreg) */
    /* compLbl.style.top = `${hreg}px` */
    data.forEach(element => {
        const info = {
            regionId: element.region_id,
            regionName: element.region_name,
        }
        const regionItem = document.createElement('li')
        regionItem.innerText = info.regionName
        regionItem.classList.add('sug-comp')
        regionsList.appendChild(regionItem)

        regionItem.addEventListener('click', () => selectRegionFunction(info))
    })
}

function selectRegionFunction(info) {
    varSelectRegion = 0
    regionsList.classList.add('none')
    regionsList.innerHTML = ''
    regionSelect.innerHTML = `${info.regionName}<i class="fas fa-caret-down"></i>`

    countrySelect.classList.remove('disable')
    citySelect.classList.add('disable')
    address.disabled = true
    address.classList.add('disable')
    countrySelect.innerHTML = `Seleccionar país<i class="fas fa-caret-down"></i>`
    citySelect.innerHTML = `Seleccionar ciudad<i class="fas fa-caret-down"></i>`
    countriesList.classList.add('none')
    citiesList.classList.add('none')

    varEnableCity = 0
    varSelectCountry = 0
    varEnableCountry = 1
    varRegId = +info.regionId
    varCountId = null
    varCityId = null
}

//select country
countrySelect.addEventListener('click', () => {
    if(varEnableCountry === 1) {
        if(varSelectCountry === 0) {
            getCountries()
        } else if(varSelectCountry === 1) {
            countriesList.classList.add('none')
            countriesList.innerHTML = ''
            varSelectCountry = 0
        }
    }
})

async function getCountries() {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/regions/${varRegId}/countries`, options)
    const data = await response.json()
    console.log(data)
    renderSelectCountries(data)
}

function renderSelectCountries(data) {
    varSelectCountry = 1
    countriesList.innerHTML = ''
    countriesList.classList.remove('none')
    /* const hreg = (data.length * 24 + 6) / 2
    console.log(hreg) */
    data.forEach(element => {
        const info = {
            countryId: element.country_id,
            countryName: element.country_name,
        }
        const countryItem = document.createElement('li')
        countryItem.innerText = info.countryName
        countryItem.classList.add('sug-comp')
        countriesList.appendChild(countryItem)

        countryItem.addEventListener('click', () => selectCountryFunction(info))
    })
}

function selectCountryFunction(info) {
    varSelectCountry = 0
    countriesList.classList.add('none')
    countriesList.innerHTML = ''
    countrySelect.innerHTML = `${info.countryName}<i class="fas fa-caret-down"></i>`

    citySelect.classList.remove('disable')
    address.disabled = true
    address.classList.add('disable')
    citySelect.innerHTML = `Seleccionar ciudad<i class="fas fa-caret-down"></i>`
    citiesList.classList.add('none')

    varEnableCity = 1
    varCountId = +info.countryId
}

//select city
citySelect.addEventListener('click', () => {
    if(varEnableCity === 1) {
        if(varSelectCity === 0) {
            getCities()
        } else if(varSelectCity === 1) {
            citiesList.classList.add('none')
            citiesList.innerHTML = ''
            varSelectCity = 0
        }
    }
})

async function getCities() {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/countries/${varCountId}/cities`, options)
    const data = await response.json()
    console.log(data)
    renderSelectCities(data)
}

function renderSelectCities(data) {
    varSelectCity = 1
    citiesList.innerHTML = ''
    citiesList.classList.remove('none')
    // const hreg = (data.length * 24 + 6) / 2
    // console.log(hreg)
    data.forEach(element => {
        const info = {
            cityId: element.city_id,
            cityName: element.city_name,
        }
        const cityItem = document.createElement('li')
        cityItem.innerText = info.cityName
        cityItem.classList.add('sug-comp')
        citiesList.appendChild(cityItem)

        cityItem.addEventListener('click', () => selectCityFunction(info))
    })
}

function selectCityFunction(info) {
    varSelectCity = 0
    citiesList.classList.add('none')
    citiesList.innerHTML = ''
    citySelect.innerHTML = `${info.cityName}<i class="fas fa-caret-down"></i>`
    address.disabled = false
    address.classList.remove('disable')
    varCityId = +info.cityId
}

//select interest
interestSelect.addEventListener('click', () => {
    if(varSelectInterest === 0) {
        showInterest()
    } else if(varSelectInterest === 1) {
        interestsList.classList.add('none')
        varSelectInterest = 0
    }
})

function showInterest() {
    interestsList.classList.remove('none')
    varSelectInterest = 1
    const intArray = document.querySelectorAll('.int')
    intArray.forEach(element => {
        element.addEventListener('click', () => selectInterestFunction(element.innerText))
    })
}

function selectInterestFunction(interest) {
    varSelectInterest = 0
    interestsList.classList.add('none')
    interestSelect.innerHTML = `${interest}<i class="fas fa-caret-down"></i>`
}

//contact channels
//telephone
telephone.addEventListener('keyup', () => enablePrefTel())

function enablePrefTel() {
    if(telephone.value !== '') {
        selectTelephone.classList.remove('disable')
        varEnablePrefT = 1
    } else if(telephone.value === '') {
        selectTelephone.classList.add('disable')
        selectTelephone.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
        varEnablePrefT = 0
    }
}

selectTelephone.addEventListener('click', () => {
    if(varEnablePrefT === 1) {
        if(varPrefTel === 0) {
            showPrefTel()
        } else if(varPrefTel === 1) {
            prefTelephoneList.classList.add('none')
            varPrefTel = 0
        }
    }
})

function showPrefTel() {
    prefTelephoneList.classList.remove('none')
    varPrefTel = 1
    const prefArray = document.querySelectorAll('.pref-tel')
    prefArray.forEach(element => {
        element.addEventListener('click', () => selectPrefTelFunction(element.innerText))
    })
}

function selectPrefTelFunction(pref) {
    varPrefTel = 0
    prefTelephoneList.classList.add('none')
    preferenceIcons(pref, selectTelephone)
}

//whatsapp
whatsapp.addEventListener('keyup', () => enablePrefWsp())

function enablePrefWsp() {
    if(whatsapp.value !== '') {
        selectWhatsapp.classList.remove('disable')
        varEnablePrefW = 1
    } else if(whatsapp.value === '') {
        selectWhatsapp.classList.add('disable')
        selectWhatsapp.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
        varEnablePrefW = 0
    }
}

selectWhatsapp.addEventListener('click', () => {
    if(varEnablePrefW === 1) {
        if(varPrefWsp === 0) {
            showPrefWsp()
        } else if(varPrefWsp === 1) {
            prefWhatsappList.classList.add('none')
            varPrefWsp = 0
        }
    }
})

function showPrefWsp() {
    prefWhatsappList.classList.remove('none')
    varPrefWsp = 1
    const prefArray = document.querySelectorAll('.pref-wsp')
    prefArray.forEach(element => {
        element.addEventListener('click', () => selectPrefWspFunction(element.innerText))
    })
}

function selectPrefWspFunction(pref) {
    varPrefWsp = 0
    prefWhatsappList.classList.add('none')
    preferenceIcons(pref, selectWhatsapp)
}

//instagram
instagram.addEventListener('keyup', () => enablePrefInst())

function enablePrefInst() {
    if(instagram.value !== '') {
        selectInstagram.classList.remove('disable')
        varEnablePrefI = 1
    } else if(instagram.value === '') {
        selectInstagram.classList.add('disable')
        selectInstagram.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
        varEnablePrefI = 0
    }
}

selectInstagram.addEventListener('click', () => {
    if(varEnablePrefI === 1) {
        if(varPrefInst === 0) {
            showPrefInst()
        } else if(varPrefInst === 1) {
            prefInstagramList.classList.add('none')
            varPrefInst = 0
        }
    }
})

function showPrefInst() {
    prefInstagramList.classList.remove('none')
    varPrefInst = 1
    const prefArray = document.querySelectorAll('.pref-inst')
    prefArray.forEach(element => {
        element.addEventListener('click', () => selectPrefInstFunction(element.innerText))
    })
}

function selectPrefInstFunction(pref) {
    varPrefInst = 0
    prefInstagramList.classList.add('none')
    preferenceIcons(pref, selectInstagram)
}

//facebook
facebook.addEventListener('keyup', () => enablePrefFace())

function enablePrefFace() {
    if(facebook.value !== '') {
        selectFacebook.classList.remove('disable')
        varEnablePrefF = 1
    } else if(facebook.value === '') {
        selectFacebook.classList.add('disable')
        selectFacebook.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
        varEnablePrefF = 0
    }
}

selectFacebook.addEventListener('click', () => {
    if(varEnablePrefF === 1) {
        if(varPrefFace === 0) {
            showPrefFace()
        } else if(varPrefFace === 1) {
            prefFacebookList.classList.add('none')
            varPrefFace = 0
        }
    }
})

function showPrefFace() {
    prefFacebookList.classList.remove('none')
    varPrefFace = 1
    const prefArray = document.querySelectorAll('.pref-face')
    prefArray.forEach(element => {
        element.addEventListener('click', () => selectPrefFaceFunction(element.innerText))
    })
}

function selectPrefFaceFunction(pref) {
    varPrefFace = 0
    prefFacebookList.classList.add('none')
    preferenceIcons(pref, selectFacebook)
}

//linkedin
linkedin.addEventListener('keyup', () => enablePrefLink())

function enablePrefLink() {
    if(linkedin.value !== '') {
        selectLinkedin.classList.remove('disable')
        varEnablePrefL = 1
    } else if(linkedin.value === '') {
        selectLinkedin.classList.add('disable')
        selectLinkedin.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
        varEnablePrefL = 0
    }
}

selectLinkedin.addEventListener('click', () => {
    if(varEnablePrefL === 1) {
        if(varPrefLink === 0) {
            showPrefLink()
        } else if(varPrefLink === 1) {
            prefLinkedinList.classList.add('none')
            varPrefLink = 0
        }
    }
})

function showPrefLink() {
    prefLinkedinList.classList.remove('none')
    varPrefLink = 1
    const prefArray = document.querySelectorAll('.pref-link')
    prefArray.forEach(element => {
        element.addEventListener('click', () => selectPrefLinkFunction(element.innerText))
    })
}

function selectPrefLinkFunction(pref) {
    varPrefLink = 0
    prefLinkedinList.classList.add('none')
    preferenceIcons(pref, selectLinkedin)
}

function preferenceIcons(pref, select) {
    if(pref === 'Sin preferencia') {
        select.innerHTML = `${pref}<i class="fas fa-caret-down"></i>`
    } else if(pref === 'Canal favorito') {
        select.innerHTML = `<i class="fas fa-heart"></i><p>${pref}</p><i class="fas fa-caret-down"></i>`
    } else if (pref === 'No molestar') {
        select.innerHTML = `<i class="fas fa-ban"></i><p>${pref}</p><i class="fas fa-caret-down"></i>`
    }
}

//close window new contact 
cancelContact.addEventListener('click', (event) => closeWindowNewContact(event))
closeNewCtc.addEventListener('click', (event) => closeWindowNewContact(event))
/* cancelContact.addEventListener('click', () => getContacts())
closeNewCtc.addEventListener('click', () => getContacts()) */

function closeWindowNewContact(event) {
    event.preventDefault()
    firstname.value = ''
    lastname.value = ''
    position.value = ''
    email.value = ''
    address.value = ''
    telephone.value = ''
    whatsapp.value = ''
    instagram.value = ''
    facebook.value = ''
    linkedin.value = ''
    company.innerHTML = 'Seleccionar compañía<i class="fas fa-caret-down"></i>'
    regionSelect.innerHTML = 'Seleccionar región<i class="fas fa-caret-down"></i>'
    countrySelect.innerHTML = 'Seleccionar país<i class="fas fa-caret-down"></i>'
    citySelect.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>'
    interestSelect.innerHTML = '0%<i class="fas fa-caret-down"></i>'
    selectTelephone.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
    selectWhatsapp.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
    selectInstagram.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
    selectFacebook.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
    selectLinkedin.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
    varCompanyId = null
    varRegId = null
    varCountId = null
    varCityId = null
    
    address.disabled = true
    darkImageAddCtc.classList.add('none')
    main.classList.remove('height-add-ctc')
    address.classList.add('disable')
    citySelect.classList.add('disable')
    countrySelect.classList.add('disable')
    regionsList.classList.add('none')
    countriesList.classList.add('none')
    citiesList.classList.add('none')
    selectTelephone.classList.add('disable')
    selectWhatsapp.classList.add('disable')
    selectInstagram.classList.add('disable')
    selectFacebook.classList.add('disable')
    selectLinkedin.classList.add('disable')
    prefTelephoneList.classList.add('none')
    prefWhatsappList.classList.add('none')
    prefInstagramList.classList.add('none')
    prefFacebookList.classList.add('none')
    prefLinkedinList.classList.add('none')
    
    firstname.classList.remove('border-wrong')
    msgFirst.classList.remove('visible')
    lastname.classList.remove('border-wrong')
    msgLast.classList.remove('visible')
    position.classList.remove('border-wrong')
    msgPos.classList.remove('visible')
    email.classList.remove('border-wrong')
    msgEmail.classList.remove('visible')
    msgEmail.innerText = 'Error en datos ingresados'
    company.classList.remove('border-wrong')
    regionSelect.classList.remove('border-wrong')
    countrySelect.classList.remove('border-wrong')
    citySelect.classList.remove('border-wrong')
    address.classList.remove('border-wrong')
    msgAddress.classList.remove('visible')

    varSelectRegion = 0
    varSelectCountry = 0
    varEnablePrefT = 0
    varEnablePrefW = 0
    varEnablePrefI = 0
    varEnablePrefF = 0
    varEnablePrefL = 0
    /* getContacts() */
}

//save contact
saveContact.addEventListener('click', (event) => addContact(event))

async function addContact(event) {
    event.preventDefault()
    const channels = [
        { channel_id: channelsDB[0].channelId, user_account: telephone.value, preference: selectTelephone.innerText },
        { channel_id: channelsDB[1].channelId, user_account: whatsapp.value, preference: selectWhatsapp.innerText },
        { channel_id: channelsDB[2].channelId, user_account: instagram.value, preference: selectInstagram.innerText },
        { channel_id: channelsDB[3].channelId, user_account: facebook.value, preference: selectFacebook.innerText },
        { channel_id: channelsDB[4].channelId, user_account: linkedin.value, preference: selectLinkedin.innerText }
    ]
    let filteredChannels = []
    channels.forEach(chan => {
        if(chan.user_account !== '') {
            filteredChannels = filteredChannels.concat(chan)
        }
    })
    
    const contact = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        /* region_id: varRegId,
        country_id: varCountId, */
        city_id: varCityId,
        address: address.value,
        company_id: varCompanyId,
        position: position.value,
        interest: +interestSelect.innerText.slice(0, -1),
        preferred_channels: filteredChannels
    }
    
    validateData(contact)
    const options = {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch('http://localhost:3000/contacts', options)
        console.log(response.text())
        if(response.status === 409) {
            email.classList.add('border-wrong')
            msgEmail.classList.add('visible')
            msgEmail.innerText = 'El email ya existe'
        }
        
        const data = await response.json()
        console.log(data)
    } catch(reason) {
        return reason
    }
    closeWindowNewContact(event)
}

function validateData(contact) {
    if(contact.firstname === '') {
        firstname.classList.add('border-wrong')
        msgFirst.classList.add('visible')
        firstname.addEventListener('keyup', () => {
            if(firstname.value !== '') {
                firstname.classList.remove('border-wrong')
                msgFirst.classList.remove('visible')
            }
        })
    }
    if(contact.lastname === '') {
        lastname.classList.add('border-wrong')
        msgLast.classList.add('visible')
        lastname.addEventListener('keyup', () => {
            if(lastname.value !== '') {
                lastname.classList.remove('border-wrong')
                msgLast.classList.remove('visible')
            }
        })
    }
    if(contact.position === '') {
        position.classList.add('border-wrong')
        msgPos.classList.add('visible')
        position.addEventListener('keyup', () => {
            if(position.value !== '') {
                position.classList.remove('border-wrong')
                msgPos.classList.remove('visible')
            }
        })
    }
    if(contact.email === '' || !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.value))) {
        email.classList.add('border-wrong')
        msgEmail.classList.add('visible')
        email.addEventListener('keyup', () => {
            if(email.value !== '' && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.value))) {
                email.classList.remove('border-wrong')
                msgEmail.classList.remove('visible')
            }
        })
    }
    if(contact.company_id === null) {
        company.classList.add('border-wrong')
        selectCompany.addEventListener('click', () => {
            if(company.innerText !== 'Seleccionar compañía') {
                company.classList.remove('border-wrong')
            }
        })
    }
    if(regionSelect.innerText === 'Seleccionar región') {
        regionSelect.classList.add('border-wrong')
        regionsList.addEventListener('click', () => {
            if(regionSelect.innerText !== 'Seleccionar región') {
                regionSelect.classList.remove('border-wrong')
            }
        })
    }
    if(countrySelect.innerText === 'Seleccionar país') {
        countrySelect.classList.add('border-wrong')
        countriesList.addEventListener('click', () => {
            if(countrySelect.innerText !== 'Seleccionar país') {
                countrySelect.classList.remove('border-wrong')
            }
        })
    }
    if(contact.city_id === undefined) {
        citySelect.classList.add('border-wrong')
        citiesList.addEventListener('click', () => {
            if(citySelect.innerText !== 'Seleccionar ciudad') {
                citySelect.classList.remove('border-wrong')
            }
        })
    }
    if(contact.address === '') {
        address.classList.add('border-wrong')
        msgAddress.classList.add('visible')
        address.addEventListener('keyup', () => {
            if(address.value !== '') {
                address.classList.remove('border-wrong')
                msgAddress.classList.remove('visible')
            }
        })
    }
}

//edit contact
async function contactEdition(info) {
    darkImageEditCtc.classList.remove('none')
    main.classList.add('height-add-ctc')
    getAllChannels()
    const options = {                   
        method: 'GET',  
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/contacts/${info.contactId}`, options)
    const data = await response.json()
    console.log(data)
}

//close window edit contact 
closeEditCtc.addEventListener('click', (event) => closeWindowEditContact(event))
deleteContactEdit.addEventListener('click', (event) => closeWindowEditContact(event))

function closeWindowEditContact(event) {
    event.preventDefault()
    darkImageEditCtc.classList.add('none')
}

/* async function editContact(info, contactList) {  
    const options = {                   
        method: 'PUT',  
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/contacts/${info.contactId}`, options)
    const data = await response.json()
    console.log(data)
    //getUsers()
} */

//ui kit
//inicio
//nuevo contacto
//editar contacto
//editar canales de contacto



//borrar canales al borrar contacto 
//no refresca al eliminar, crear contacto, provocaba error al ordenar
//si tengo ganas cambiar los id de los canalaes en el html