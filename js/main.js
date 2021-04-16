const submit = document.getElementById('submit')
const username = document.getElementById('username')
const password = document.getElementById('password')
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
    console.log(data)
    saveToken(data)
}

function saveToken(data) {
    localStorage.setItem('Token', JSON.stringify(data))
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
