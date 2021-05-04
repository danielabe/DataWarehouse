const darkImageContacts = document.getElementById('darkImageContacts')
const cancelDltContBtn = document.getElementById('cancelDltContBtn')
const deleteContactBtn = document.getElementById('deleteContactBtn')

contacts.addEventListener('click', () => {
    getContacts()
})

async function getContacts() {
    console.log(JSON.parse(sessionStorage.getItem('Token')))
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/contacts', options)
    const data = await response.json()
    console.log(data)

    const contactsList = document.createElement('div')

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
            interest: element.interest
        }
        console.log(element)
        const row = document.createElement('div')
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

        contactsList.classList.add('users-list')
        row.classList.add('row-contact')
        contact.classList = 'u-item col-item'        
        country.classList = 'u-item col-item'     
        company.classList.add('u-item')        
        position.classList.add('u-item')        
        preferredChannel.classList.add('u-item')        
        interest.classList.add('u-item')            
        checkbox.classList = 'far fa-square u-item'
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
        contactsSection.appendChild(contactsList)

        row.addEventListener('mouseover', () => hoverRow(ellipsis, trash, pen))
        row.addEventListener('mouseout', () => outRow(ellipsis, trash, pen))

        trash.addEventListener('click', () => modalDelete(info, contactsList))
        pen.addEventListener('click', () => editUser(info, contactsList))
    })
}

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
        deleteContact(info, contactsList)
    })
}

async function deleteContact(info, contactsList) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/contacts/${info.contactId}`, options)
    const data = await response.json()
    console.log(data)
    contactsList.remove()
    getContacts()
}