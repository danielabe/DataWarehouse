const headUs = document.getElementById('headUs')
const usersList = document.getElementById('usersList')
const newUserBtn = document.getElementById('newUserBtn')

async function getUsers() {
    usersList.innerHTML = ''
    console.log(JSON.parse(sessionStorage.getItem('Token')))
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/users', options)
    const data = await response.json()
    console.log(data)

    data.forEach(element => {
        const info = {
            userId: element.user_id,
            firstname: element.firstname,
            lastname: element.lastname,
            email: element.email,
            perfil: element.perfil
        }
        console.log(element)
        const row = document.createElement('li')
        const user = document.createElement('div')
        const email = document.createElement('div')
        const perfil = document.createElement('div')
        const actions = document.createElement('div')
        const ellipsis = document.createElement('i')
        const trash = document.createElement('i')
        const pen = document.createElement('i')

        user.innerText = info.firstname + ' ' + info.lastname
        email.innerText = info.email
        perfil.innerText = info.perfil
   
        row.classList.add('row-user')
        user.classList.add('u-item')        
        email.classList.add('u-item')     
        perfil.classList.add('u-item') 
        actions.classList = 'u-item action'
        ellipsis.classList = 'fas fa-ellipsis-h'
        trash.classList = 'fas fa-trash none'
        pen.classList = 'fas fa-pen none'

        actions.appendChild(ellipsis)
        actions.appendChild(trash)
        actions.appendChild(pen)
        usersList.appendChild(row)
        row.appendChild(user)
        row.appendChild(email)
        row.appendChild(perfil)
        row.appendChild(actions)

        row.addEventListener('mouseover', () => hoverRow(ellipsis, trash, pen))
        row.addEventListener('mouseout', () => outRow(ellipsis, trash, pen))

        trash.addEventListener('click', () => deleteUser(info, usersList))
        pen.addEventListener('click', () => editUser(info, usersList))
    })
}

function hoverRow(ellipsis, trash, pen) {
    ellipsis.classList.add('none')
    trash.classList.remove('none')
    pen.classList.remove('none')
}

function outRow(ellipsis, trash, pen) {
    ellipsis.classList.remove('none')
    trash.classList.add('none')
    pen.classList.add('none')
}

async function deleteUser(info, usersList) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/users/${info.userId}`, options)
    const data = await response.json()
    console.log(data)
    getUsers()
}

async function editUser(info, usersList) {  //esta funcion la voy a hacer luego, para ver
    const options = {                   //primero como se hace en contactos, hacer
        method: 'PUT',                  //diseño correspondiente y generar json para el body
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/users/${info.userId}`, options)
    const data = await response.json()
    console.log(data)
    getUsers()
}

//add user
const darkImageNewUser = document.getElementById('darkImageNewUser')
const closeNewUser = document.getElementById('closeNewUser')
const cancelUser = document.getElementById('cancelUser')
const userName = document.getElementById('userName')
const userLastname = document.getElementById('userLastname')
const userEmail = document.getElementById('userEmail')
const userPass = document.getElementById('userPass')
const userPassRep = document.getElementById('userPassRep')
const perfilSlt = document.getElementById('perfilSlt')
const perfilList = document.getElementById('perfilList')
newUserBtn.addEventListener('click', () => {
    window.scrollTo(0, 0)
    /* body.classList.add('modal') */
    darkImageNewUser.classList.remove('none')
    /* companyCity.style.top = '0px' */
})

closeNewUser.addEventListener('click', (event) => closeWindowNewUser(event))
cancelUser.addEventListener('click', (event) => closeWindowNewUser(event))

function closeWindowNewUser(event) {
    event.preventDefault()
    userName.value = ''
    userLastname.value = ''
    userEmail.value = ''
    userPass.value = ''
    userPassRep.value = ''
    perfilSlt.innerHTML = 'Seleccionar perfil<i class="fas fa-caret-down"></i>'
    /* msgCompanyName.innerText = 'Este campo es obligatorio' */
    
    /* body.classList.remove('modal') */
    companyName.classList.remove('border-wrong')
    msgCompanyName.classList.remove('visible')
    companyEmail.classList.remove('border-wrong')
    msgCompanyEmail.classList.remove('visible')
    compAddress.classList.remove('border-wrong')
    msgCompAddress.classList.remove('visible')
    compTelephone.classList.remove('border-wrong')
    msgCompTelephone.classList.remove('visible')
    companySlt.classList.remove('border-wrong')
    
    darkImageNewUser.classList.add('none')
    perfilList.classList.add('none')
    /* companyCity.style.top = '0px' */

    /* varCompCityId = null
    varSelectCityComp = 0 */
}
