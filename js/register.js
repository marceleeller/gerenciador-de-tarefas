const $ = (elemento) => document.querySelector(elemento);

const nameInput = $("#newName");
const emailInput = $("#newEmail");
const passwordInput = $("#newPassword");

let validName = false;
let validEmail = false;
let validPassword = false;

// error and success messages
const msgError = $('#msgError');
const msgErrorLogin = $('#msgErrorLogin');
const msgSuccess = $('#msgSuccess');

function msgErrorOrSuccess(eOrS, msg) {
    eOrS.setAttribute('style', 'display:block');
    eOrS.innerHTML = (msg)
}

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

    if(validName === false || validPassword === false || validateEmail === false) {
        msgErrorOrSuccess(msgError, 'Preencha todos os campos corretamente')
        return;
    }

    let userList = JSON.parse(localStorage.getItem('userList') || '[]');

    var validUser = true;
    userList.forEach(user => {
        if(user.emailReg == emailInput.value){
            validUser = false;
        }
    });

    if(validUser === false) {
        msgErrorOrSuccess(msgError, 'Usuário existente, insira um e-mail diferente')
        return;
    }
    
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
    msgErrorOrSuccess(msgSuccess, 'Criando cadastro...');

    setTimeout(() => {
        window.location.href = "./index.html";
    }, 1500);   
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

    if(email.value <= 0 && password.value <= 0) {
        msgErrorOrSuccess(msgErrorLogin, 'Preencha todos os campos')

    } else if (email.value == userValid.email && password.value == userValid.password){
        msgErrorLogin.setAttribute('style', 'display:none');
        msgErrorOrSuccess(msgSuccessLogin, 'Sucesso! Entrando...');

        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
        localStorage.setItem('token', token);
        localStorage.setItem('loggedUser', JSON.stringify(userValid))

        setTimeout(() => {
            window.location.href = "pages/task_manager.html";
        }, 1500); 
    } else {
        msgErrorOrSuccess(msgErrorLogin, 'Usuário não encontrado')
        email.classList.add('is-invalid');
        password.classList.add('is-invalid');
    }
})


// Exibir e esconder senha
function password_show_hide_login() {
    var x = $("#password");
    var show_eye = $("#show_eye");
    var hide_eye = $("#hide_eye");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
      x.type = "text";
      show_eye.style.display = "none";
      hide_eye.style.display = "block";
    } else {
      x.type = "password";
      show_eye.style.display = "block";
      hide_eye.style.display = "none";
    }
  }
function password_show_hide_register() {
    var x = $("#newPassword");
    var show_eye = $("#show_eye_register");
    var hide_eye = $("#hide_eye_register");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
      x.type = "text";
      show_eye.style.display = "none";
      hide_eye.style.display = "block";
    } else {
      x.type = "password";
      show_eye.style.display = "block";
      hide_eye.style.display = "none";
    }
  }