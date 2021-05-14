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

let contIdArray = []
let dataCheckbox = []

let varSortName = 0
let varSortCountry = 0
let varSortCompany = 0
let varSortPosition = 0
let varSortInterest = 0
let varDelete = 0
let varSelectCompany = 0

let varCheckboxAll = 'unselected'

//show contacts 
contacts.addEventListener('click', () => {
    getContacts()
})

async function getContacts() {
    contactsList.innerHTML = '' //ver si puedo sacar este
    console.log(JSON.parse(sessionStorage.getItem('Token')))
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
    console.log(varCheckboxAll)
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
        pen.addEventListener('click', () => editUser(info, contactsList))

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
    getContacts()
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
        getContacts()
    })
    checkAfterSortAndSearch() //no se si funciona el data, con o sin data va igual, no se si es correcto
}

//sort columns
function sortByName(data) {
    const sortedNames = data.sort(function (a, b) {
        if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) { 
            return 1
        }
        if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedNames)
    varSortName = 1
    /* varCheckboxAll = 0 */
}

function sortByNameReverse(data) {
    const sortedNames = data.reverse(function (a, b) {
        if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) { 
            return 1
        }
        if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
          return -1
        }
        return 0
    })
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
    console.log(varCheckboxAll)
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
        console.log('indeterminado a no seleccionado')
        checkboxAll.classList = 'far fa-square'
        //desseleccionar seleccionados
        contIdArray = []
        console.log(contIdArray)
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
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageAddCtc.classList.remove('none')
    console.log('add contact')
})

//select company
company.addEventListener('click', () => {
    if(varSelectCompany === 0) {
        getCompanies()
    } else if(varSelectCompany === 1) {
        selectCompany.classList.add('none')
        selectCompany.innerHTML = ''
        varSelectCompany = 0
        compLbl.style.top = '0px'
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
        const comp = document.createElement('li')
        comp.innerText = element.company_name
        comp.classList.add('sug-comp')
        selectCompany.appendChild(comp)

        comp.addEventListener('click', () => console.log(element.company_id))
    })
}