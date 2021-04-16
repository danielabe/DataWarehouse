const submit = document.getElementById('submit')
const username = document.getElementById('username')
const password = document.getElementById('password')
submit.addEventListener('click', (event) => {
    event.preventDefault()
    loginFunction()
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
}
