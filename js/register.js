const $ = (elemento) => document.querySelector(elemento);

const nameInput = $("#newName");
const emailInput = $("#newEmail");
const passwordInput = $("#newPassword");

let validName = false;
let validEmail = false;
let validPassword = false;

// Validate name
nameInput.addEventListener('keyup', () => {
    if(nameInput.value.length <= 2) {
        nameInput.classList.add('is-invalid')
    } else {
        nameInput.classList.remove('is-invalid')
        nameInput.classList.add('is-valid')
        validName = true;
    }
})

// Validate password
passwordInput.addEventListener('keyup', () => {
    if(passwordInput.value.length <= 6) {
        passwordInput.classList.add('is-invalid')
    } else {
        passwordInput.classList.remove('is-invalid')
        passwordInput.classList.add('is-valid')
        validPassword = true;
    }
})

// Validate email
function validateEmail(email) {
    let emailPattern = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/
    return emailPattern.test(email);
}

emailInput.addEventListener('keyup', () => {
    if(validateEmail(emailInput.value) !== true) {
        emailInput.classList.add('is-invalid')
    } else {
        emailInput.classList.remove('is-invalid')
        emailInput.classList.add('is-valid')
        validEmail = true;
    }
})

// Cadastrar usuario
$("#register").addEventListener("click", (evnt) => {
    evnt.preventDefault();

    const msgError = $('#msgError')
    const msgSuccess = $('#msgSuccess')

    if(validName === false || validPassword === false || validateEmail === false) {
        msgError.setAttribute('style', 'display:block');
        return;
    }

    let userList = JSON.parse(localStorage.getItem('userList') || '[]');

    userList.push(
        {
            nameReg: nameInput.value,
            emailReg: emailInput.value,
            passwordReg: passwordInput.value,
            tasksReg: [],
            completedTasks: []
        }
    )

    localStorage.setItem('userList', JSON.stringify(userList))

    msgError.setAttribute('style', 'display:none');
    msgSuccess.setAttribute('style', 'display:block');

    setTimeout(() => {
        window.location.href = "./index.html";
    }, 2000);   
})

// Login Usuario
$('#signin').addEventListener('click', (evnt) => {
    evnt.preventDefault();

    const email = $('#email');
    const password = $('#password');
    let userList = [];

    let userValid = {
        email: '',
        password: ''
    }

    userList = JSON.parse(localStorage.getItem('userList'));

    userList.forEach((item) => {
        if (item.emailReg == email.value && item.passwordReg == password.value) {
            userValid = {
                name: item.nameReg,
                email: item.emailReg,
                password: item.passwordReg
            }
        }
    });

    if(email.value == userValid.email && password.value == userValid.password) {
        window.location.href = "pages/task_manager.html";

        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
        localStorage.setItem('token', token);
        localStorage.setItem('loggedUser', JSON.stringify(userValid))


    } else {
        msgErrorLogin.setAttribute('style', 'display:block');
        email.classList.add('is-invalid');
        password.classList.add('is-invalid');
    }
})


// Exibir e esconder senha
let btn = $('.bi-eye-fill')
btn.addEventListener('click', () => {
    let inputPassword = $('#password');

    if(inputPassword.getAttribute('type') == 'password') {
        inputPassword.setAttribute('type', 'text')
    } else {
        inputPassword.setAttribute('type', 'password');
    }
})
