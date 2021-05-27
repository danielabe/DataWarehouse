const companiesList = document.getElementById('companiesList')

//show companies
companies.addEventListener('click', () => getCompanies())

async function getCompanies() {
    companiesList.innerHTML = '' //ver si puedo sacar este
    /* console.log(JSON.parse(sessionStorage.getItem('Token'))) */
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

        /* trash.addEventListener('click', () => modalDelete())
        pen.addEventListener('click', () => contactEdition(info)) */
    })
}