const companiesList = document.getElementById('companiesList')
const newCompanyBtn = document.getElementById('newCompanyBtn')
const darkImageNewCompany = document.getElementById('darkImageNewCompany')
const closeNewComp = document.getElementById('closeNewComp')
const cancelCompany = document.getElementById('cancelCompany')
const msgCompanyName = document.getElementById('msgCompanyName')
const msgCompanyEmail = document.getElementById('msgCompanyEmail')
const msgCompAddress = document.getElementById('msgCompAddress')
const msgCompTelephone = document.getElementById('msgCompTelephone')
const companySlt = document.getElementById('companySlt')
const saveCompany = document.getElementById('saveCompany')
const companyList = document.getElementById('companyList')
const companyName = document.getElementById('companyName')
const companyEmail = document.getElementById('companyEmail')
const compAddress = document.getElementById('compAddress')
const compTelephone = document.getElementById('compTelephone')
const companyCity = document.getElementById('companyCity')

let varSelectCityComp = 0

let varCompCityId = null

//show companies
companies.addEventListener('click', () => showCompanies())

async function showCompanies() {
    companiesList.innerHTML = '' //ver si puedo sacar este
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/companies', options)
    const data = await response.json()
    console.log(data)
    renderCompanies(data)
}

function renderCompanies(data) {
    companiesList.innerHTML = ''
    data.forEach(async element => {
        const info = {
            companyId: element.company_id,
            companyName: element.company_name,
            cityId: element.city_id,
            cityName: element.city_name,
            countryId: element.country_id,
            countryName: element.country_name,
            regionId: element.region_id,
            regionName: element.region_name,
            address: element.address,
            email: element.email,
            telephone: element.telephone
        }
        
        const row = document.createElement('li')
        const company = document.createElement('div')
        const country = document.createElement('div')
        const address = document.createElement('div')
        const telephone = document.createElement('div')
        const actions = document.createElement('div')
        const ellipsis = document.createElement('i')
        const trash = document.createElement('i')
        const pen = document.createElement('i')

        company.innerHTML = `<p>${info.companyName}</p><p class="grey-info">${info.email}</p>`
        country.innerHTML = `<p>${info.countryName}</p><p class="grey-info">${info.regionName}</p>`
        address.innerText = info.address
        telephone.innerText = info.telephone

        row.classList.add('row-companies')
        company.classList = 'u-item col-item'        
        country.classList = 'u-item col-item'     
        address.classList = 'u-item col-item comp-item'     
        telephone.classList = 'u-item col-item'     
        actions.classList = 'u-item action'
        ellipsis.classList = 'fas fa-ellipsis-h'
        trash.classList = 'fas fa-trash none'
        pen.classList = 'fas fa-pen none'

        actions.appendChild(ellipsis)
        actions.appendChild(trash)
        actions.appendChild(pen)
        companiesList.appendChild(row)
        row.appendChild(company)
        row.appendChild(country)
        row.appendChild(address)
        row.appendChild(telephone)
        row.appendChild(actions)

        row.addEventListener('mouseover', () => hoverRow(ellipsis, trash, pen))
        row.addEventListener('mouseout', () => outRow(ellipsis, trash, pen))

        trash.addEventListener('click', () => modalDeleteCompany(info.companyId))
        /* 
        pen.addEventListener('click', () => contactEdition(info)) */
    })
}

//add company
newCompanyBtn.addEventListener('click', () => {
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageNewCompany.classList.remove('none')
    companyCity.style.top = '0px'
})

//close window new company
cancelCompany.addEventListener('click', (event) => closeWindowNewCompany(event))
closeNewComp.addEventListener('click', (event) => closeWindowNewCompany(event))

function closeWindowNewCompany(event) {
    event.preventDefault()
    companyName.value = ''
    companyEmail.value = ''
    compTelephone.value = ''
    compAddress.value = ''
    companySlt.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>'
    msgCompanyName.innerText = 'Este campo es obligatorio'
    
    body.classList.remove('modal')
    companyName.classList.remove('border-wrong')
    msgCompanyName.classList.remove('visible')
    companyEmail.classList.remove('border-wrong')
    msgCompanyEmail.classList.remove('visible')
    compAddress.classList.remove('border-wrong')
    msgCompAddress.classList.remove('visible')
    compTelephone.classList.remove('border-wrong')
    msgCompTelephone.classList.remove('visible')
    companySlt.classList.remove('border-wrong')
    
    darkImageNewCompany.classList.add('none')
    companyList.classList.add('none')
    companyCity.style.top = '0px'

    varCompCityId = null
    varSelectCityComp = 0
}

//save company
saveCompany.addEventListener('click', (event) => addCompany(event))

async function addCompany(event) {
    msgEmail.innerText = 'Error en datos ingresados'
    event.preventDefault()
    const company = {
        company_name: companyName.value,
        email: companyEmail.value,
        address: compAddress.value,
        telephone: compTelephone.value,
        city_id: varCompCityId,
    }
    
    validateCompanyData(company, companyName, msgCompanyName, companyEmail, msgCompanyEmail, compAddress, 
        msgCompAddress, compTelephone, msgCompTelephone, companySlt, companyList)
    const options = {
        method: 'POST',
        body: JSON.stringify(company),
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch('http://localhost:3000/companies', options)
        /* console.log(response.text()) */
        if(response.status === 409) {
            companyName.classList.add('border-wrong')
            msgCompanyName.classList.add('visible')
            msgCompanyName.innerText = 'La empresa ya existe'//no controlar esto
        }
        
        const data = await response.json()
        console.log(data)
    } catch(reason) {
        return reason
    }
    closeWindowNewCompany(event)
}

function validateCompanyData(company, compName, msgCom, compEmail, msgEmail, comAddress, msgAddress, 
    compTeleph, msgCompTeleph, compSlt, compList) {
    if(company.company_name === '') {
        compName.classList.add('border-wrong')
        msgCom.classList.add('visible')
        compName.addEventListener('keyup', () => {
            if(compName.value !== '') {
                compName.classList.remove('border-wrong')
                msgCom.classList.remove('visible')
            }
        })
    }
    if(company.email === '' || !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(compEmail.value))) {
        compEmail.classList.add('border-wrong')
        msgEmail.classList.add('visible')
        compEmail.addEventListener('keyup', () => {
            if(compEmail.value !== '' && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(compEmail.value))) {
                compEmail.classList.remove('border-wrong')
                msgEmail.classList.remove('visible')
            }
        })
    }
    if(company.address === '') {
        comAddress.classList.add('border-wrong')
        msgAddress.classList.add('visible')
        comAddress.addEventListener('keyup', () => {
            if(comAddress.value !== '') {
                comAddress.classList.remove('border-wrong')
                msgAddress.classList.remove('visible')
            }
        })
    }
    if(company.telephone === '') {
        compTeleph.classList.add('border-wrong')
        msgCompTeleph.classList.add('visible')
        compTeleph.addEventListener('keyup', () => {
            if(compTeleph.value !== '') {
                compTeleph.classList.remove('border-wrong')
                msgCompTeleph.classList.remove('visible')
            }
        })
    }
    if(company.city_id === undefined || company.city_id === null) {
        compSlt.classList.add('border-wrong')
        compList.addEventListener('click', () => {
            console.log(compSlt.innerText)
            if(compSlt.innerText !== 'Seleccionar ciudad') {
                console.log('//////')
                compSlt.classList.remove('border-wrong')
            }
        })
    }
}

//select city 
companySlt.addEventListener('click', () => {
    if(varSelectCityComp === 0) {
        getCitiesComp(companyList, companySlt)
    } else if(varSelectCityComp === 1) {
        companyList.classList.add('none')
        companyCity.style.top = '0px'
        companyList.innerHTML = ''
        varSelectCityComp = 0
    }
})

async function getCitiesComp(citList, citSelect) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/cities`, options)
    const data = await response.json()
    console.log(data)
    renderSelectCitiesComp(data, citList, citSelect)
}

function renderSelectCitiesComp(data, citList, citSelect) {
    varSelectCityComp = 1
    citList.innerHTML = ''
    citList.classList.remove('none')

    const hcit = (data.length * 24 + 6) / 2
    console.log(hcit)
    companyCity.style.top = `${hcit}px`

    data.forEach(element => {
        const info = {
            cityId: element.city_id,
            cityName: element.city_name,
        }
        const cityItem = document.createElement('li')
        cityItem.innerText = info.cityName
        cityItem.classList.add('sug-comp')
        citList.appendChild(cityItem)

        cityItem.addEventListener('click', () => selectCityCompFunction(info, citList, citSelect))
    })
}

function selectCityCompFunction(info, citList, citSelect) {
    varSelectCityComp = 0
    citList.classList.add('none')
    companyCity.style.top = '0px'
    citList.innerHTML = ''
    citSelect.innerHTML = `${info.cityName}<i class="fas fa-caret-down"></i>`
    varCompCityId = +info.cityId
}


//delete company
const darkImageCompanies = document.getElementById('darkImageCompanies')
const cancelDltCompBtn = document.getElementById('cancelDltCompBtn')
const deleteCompBtn = document.getElementById('deleteCompBtn')
let varCompId = null
let varEditCompany = 0

function modalDeleteCompany(companyId) {
    console.log(companyId)
    varCompId = companyId///
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageCompanies.classList.remove('none')
}

cancelDltCompBtn.addEventListener('click', () => {
    /* window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageEditReg.style.visibility = 'visible' */
    cancelDeleteComp()
})

function cancelDeleteComp() {
    if(varEditCompany === 0) {
        console.log('despues de no edition')
        body.classList.remove('modal')
        /* darkImageEditComp.style.visibility = 'hidden'
        darkImageEditComp.classList.add('none') */
    } else if(varEditCompany === 1) {
        console.log('despues de edition')
        window.scrollTo(0, 0)
        body.classList.add('modal')
        /* darkImageEditComp.style.visibility = 'visible'
        darkImageEditComp.classList.remove('none') */
    }
    darkImageCompanies.classList.add('none')
    console.log(varRegionId)
}

function cancelComp() {
    body.classList.remove('modal')
    darkImageCompanies.classList.add('none')
    varCompId = null
    console.log(varCompId)
}

deleteCompBtn.addEventListener('click', () => {
    body.classList.remove('modal')
    darkImageCompanies.classList.add('none')
    deleteCompany(varCompId)
})

async function deleteCompany(compId) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        console.log(varRegionId)
        const response = await fetch(`http://localhost:3000/companies/${compId}`, options)
        const data = await response.json()
        console.log(data)
        cancelComp()
        showCompanies()
    } catch(reason) {
        return reason
    }
}