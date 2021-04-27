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
}