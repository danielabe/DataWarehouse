const submit = document.getElementById('submit')
const username = document.getElementById('username')
const password = document.getElementById('password')
const login = document.getElementById('login')
const usersSection = document.getElementById('usersSection')
const headUs = document.getElementById('headUs')
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
        login.classList.add('none')
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
    const users = document.createElement('div')

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

        user.innerText = info.firstname + ' ' + info.lastname
        email.innerText = info.email
        perfil.innerText = info.perfil
        actions.innerHTML = `<i class="fas fa-ellipsis-h"></i>`

        users.classList.add('users-list')
        row.classList.add('row-user')
        user.classList.add('u-item')        
        email.classList.add('u-item')     
        perfil.classList.add('u-item') 
        actions.classList.add('u-item')
        actions.classList.add('action')

        users.appendChild(row)
        row.appendChild(user)
        row.appendChild(email)
        row.appendChild(perfil)
        row.appendChild(actions)
        usersSection.appendChild(users)
    })
}
