const submit = document.getElementById('submit')
const username = document.getElementById('username')
const password = document.getElementById('password')
const loginForm = document.getElementById('loginForm')
const usersSection = document.getElementById('usersSection')
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
        method: 'post',
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
        loginForm.classList.add('none')
        //section que aparece luego de login
        usersSection.classList.remove('none')
        getUsers()
    }
}

function saveToken(data) {
    localStorage.setItem('Token', JSON.stringify(data))
}

async function getUsers() {
    console.log(JSON.parse(localStorage.getItem('Token')))
    const options = {
        method: 'get',
        headers: {
            Authorization: `token ${JSON.parse(localStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/users', options)
    const data = await response.json()
    console.log(data)
    const ul = document.createElement('ul')
    /* const item = document.createElement('li')
    ul.appendChild(item)
    item.innerHTML = data[0].firstname */
    usersSection.appendChild(ul)

    data.forEach(element => {
        const item = document.createElement('li')
        item.innerHTML = data[element].firstname
        ul.appendChild(item)
    })
}

/* let usersInformation = JSON.parse(localStorage.getItem('UsersInformation')) || []
const userInfo = {
    name: response.name,
    lastname: response.lastname,
    email: response.email,
    age: response.age
}
usersInformation = usersInformation.concat(userInfo)
localStorage.setItem('UsersInformation', JSON.stringify(usersInformation)) */
