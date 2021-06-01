const headUs = document.getElementById('headUs')
const usersList = document.getElementById('usersList')
const newUserBtn = document.getElementById('newUserBtn')
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
const saveUser = document.getElementById('saveUser')
const msgUserEmail = document.getElementById('msgUserEmail')
const msgUserName = document.getElementById('msgUserName')
const msgUserLastname = document.getElementById('msgUserLastname')
const msgUserPass = document.getElementById('msgUserPass')
const msgUserPassRep = document.getElementById('msgUserPassRep')
const darkImageUsers = document.getElementById('darkImageUsers')
const cancelDltUserBtn = document.getElementById('cancelDltUserBtn')
const deleteUserBtn = document.getElementById('deleteUserBtn')

let varSelectPerfil = 0

let uId = {}

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

        trash.addEventListener('click', () => {
            uId = {
                userId: element.user_id
            }
            modalDeleteUser()
        })
        pen.addEventListener('click', () => editUser(info/* , usersList */))
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
    msgUserEmail.innerText = 'Error en datos ingresados'
    
    userName.classList.remove('border-wrong')
    msgUserName.classList.remove('visible')
    userLastname.classList.remove('border-wrong')
    msgUserLastname.classList.remove('visible')
    userEmail.classList.remove('border-wrong')
    msgUserEmail.classList.remove('visible')
    userPass.classList.remove('border-wrong')
    msgUserPass.style.color = '#333333'
    userPassRep.classList.remove('border-wrong')
    msgUserPassRep.classList.remove('visible')
    perfilSlt.classList.remove('border-wrong')
    
    darkImageNewUser.classList.add('none')
    perfilList.classList.add('no-visible')

    /* varCompCityId = null
    varSelectCityComp = 0 */
    varSelectPerfil = 0
}

//select perfil
perfilSlt.addEventListener('click', () => {
    if(varSelectPerfil === 0) {
        const perfilClass = 'perfil'
        showPerfil(perfilList, perfilSlt, perfilClass)
    } else if(varSelectPerfil === 1) {
        perfilList.classList.add('no-visible')
        /* userPerfil.style.top = '0px' */
        /* perfilList.innerHTML = '' */
        varSelectPerfil = 0
    }
})

function showPerfil(perfList, perfSlt, perfilC) {
    perfList.classList.remove('no-visible')
    varSelectPerfil = 1
    perfArray = document.querySelectorAll(`.${perfilC}`)
    console.log(perfArray)
    perfArray.forEach(element => {
        element.addEventListener('click', () => selectPerfilFunction(element.innerHTML, perfList, perfSlt))
    })
}

function selectPerfilFunction(perfil, perfList, perfSlt) {
    varSelectPerfil = 0
    perfList.classList.add('no-visible')
    perfSlt.innerHTML = `${perfil}<i class="fas fa-caret-down"></i>`
}

//save user
saveUser.addEventListener('click', (event) => addContact(event))

async function addContact(event) {
    msgUserEmail.innerText = 'Error en datos ingresados'
    event.preventDefault()
    const user = {
        firstname: userName.value,
        lastname: userLastname.value,
        email: userEmail.value,
        perfil: perfilSlt.innerText,
        password: userPass.value,
        repeated_password: userPassRep.value
    }
    
    validateUserData(user, userName, msgUserName, userLastname, msgUserLastname, userEmail, msgUserEmail, 
        perfilSlt, perfilList, userPass, msgUserPass, userPassRep, msgUserPassRep)
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch('http://localhost:3000/users/register', options)
        
        if(response.status === 409) {
            userEmail.classList.add('border-wrong')
            msgUserEmail.classList.add('visible')
            msgUserEmail.innerText = 'El email ya existe'
        }
        
        const data = await response.json()
        console.log(data)
    } catch(reason) {
        return reason
    }
    closeWindowNewUser(event)
    getUsers()
}

function validateUserData(user, usName, msgUsName, usLastname, msgUsLastname, usEmail, msgUsEmail, 
    perfilSlt, perfilList, usPass, msgUsPass, usPassRep, msgUsPassRep) {
    if(usName.value === '') {
        usName.classList.add('border-wrong')
        msgUsName.classList.add('visible')
        usName.addEventListener('keyup', () => {
            if(usName.value !== '') {
                usName.classList.remove('border-wrong')
                msgUsName.classList.remove('visible')
            }
        })
    }
    if(usLastname.value === '') {
        usLastname.classList.add('border-wrong')
        msgUsLastname.classList.add('visible')
        usLastname.addEventListener('keyup', () => {
            if(usLastname.value !== '') {
                usLastname.classList.remove('border-wrong')
                msgUsLastname.classList.remove('visible')
            }
        })
    }
    if(usEmail.value === '' || !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(usEmail.value))) {
        usEmail.classList.add('border-wrong')
        msgUsEmail.classList.add('visible')
        usEmail.addEventListener('keyup', () => {
            if(usEmail.value !== '' && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(usEmail.value))) {
                usEmail.classList.remove('border-wrong')
                msgUsEmail.classList.remove('visible')
            }
        })
    }
    if(perfilSlt.innerText === 'Seleccionar perfil') {
        perfilSlt.classList.add('border-wrong')
        perfilList.addEventListener('click', () => {
            console.log(perfilSlt.innerText)
            if(perfilSlt.innerText !== 'Seleccionar ciudad') {
                console.log('//////')
                perfilSlt.classList.remove('border-wrong')
            }
        })
    }
    if(usPass.value === '' || !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(usPass.value))) {
        usPass.classList.add('border-wrong')
        msgUsPass.style.color = '#F03738'
        usPass.addEventListener('keyup', () => {
            if(usPass.value !== '') {
                usPass.classList.remove('border-wrong')
                msgUsPass.style.color = '#333333'
            }
        })
    }
    if(usPassRep.value === '' || usPassRep.value !== usPass.value || !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(usPassRep.value))) {
        usPassRep.classList.add('border-wrong')
        msgUsPassRep.classList.add('visible')
        usPassRep.addEventListener('keyup', () => {
            if(usPassRep.value !== '') {
                usPassRep.classList.remove('border-wrong')
                msgUsPassRep.classList.remove('visible')
            }
        })
    }
}

//delete user
function modalDeleteUser() {
    console.log(uId)
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageUsers.classList.remove('none')
    
    cancelDltUserBtn.addEventListener('click', () => {
        body.classList.remove('modal')
        darkImageUsers.classList.add('none')
        /* darkImageEditCtc.style.visibility = 'visible' */
    })
    
    /* deleteContactBtn.addEventListener('click', () => {
        body.classList.remove('modal')
        darkImageContacts.classList.add('none')
        //contactsList.innerHTML = ''
        if(varDelete === 0) {
            deleteContact(info)
        } else if (varDelete === 1) {
            deleteContacts()
        }
    }) */
}

deleteUserBtn.addEventListener('click', (event) => {
    body.classList.remove('modal')
    darkImageUsers.classList.add('none')
    /* darkImageEditCtc.classList.add('none') */
    deleteUser(uId, event)
})

async function deleteUser(info, event) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/users/${info.userId}`, options)
    const data = await response.json()
    console.log(data)
    closeWindowNewUser(event)
    getUsers()
}