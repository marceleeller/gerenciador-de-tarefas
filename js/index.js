const $ = (elemento) => document.querySelector(elemento);

let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
let userList = JSON.parse(localStorage.getItem('userList'));

let welcome = $('#welcome')
welcome.innerHTML = ('Boa tarde, ' + loggedUser.name);

//  LogOut
if(localStorage.getItem('token') == null) {
    alert('Você precisa estar logado para acessar essa página')
    window.location.href = "./login.html";
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    window.location.href = "./login.html";
}

// Input tasks

let taskInput = $('#newTask');
let beginDateInput = $('#newBeginDate');
let beginHourInput = $('#newBeginHour');
let endDateInput = $('#newEndDate');
let endHourInput = $('#newEndHour');
let descriptionInput = $('#newDescription');
let submitTask = $('#submitTask');

let validTask, validBeginDate, validBeginHour, validEndDate, validEndHour, validDescrption = false;

// Validations

submitTask.addEventListener('click', evnt => {
    evnt.preventDefault();
    const msgError = $('#msgError')
    const msgSuccess = $('#msgSuccess')

    let allFilled = 
        taskInput.value.length !== 0 &&
        descriptionInput.value.length !== 0 &&
        beginDateInput.value.length !== 0 &&
        beginHourInput.value.length !== 0 &&
        endDateInput.value.length !== 0 &&
        endHourInput.value.length !== 0;

    if (allFilled === false) {
        msgError.setAttribute('style', 'display:block');
        msgError.innerHTML = ('Preencha todos os campos')
        return;
    }

    // Validate date
    let d = beginDateInput.value.split('-')
    let h = beginHourInput.value.split(':')
    let beginTime = new Date(d[0], d[1]-1, d[2], h[0], h[1])

    d = endDateInput.value.split('-')
    h = endHourInput.value.split(':')
    let endTime = new Date(d[0], d[1]-1, d[2], h[0], h[1])
    console.log(endTime)

    if(beginTime > endTime) {
        msgError.setAttribute('style', 'display:block');
        msgError.innerHTML = ('O término deve ser depois do início da tarefa')
        return;
    }

    let tasks = {
        task: taskInput.value,
        beginDate: beginDateInput.value.split('-').reverse().join('/'),
        beginHour: beginHourInput.value,
        endDate: endDateInput.value.split('-').reverse().join('/'),
        endHour: endHourInput.value,
        description: descriptionInput.value
    }

    userList.forEach((user) => {
        if(user.emailReg == loggedUser.email){
            user.tasksReg.push(tasks)
            msgSuccess.setAttribute('style', 'display:block');
            msgSuccess.innerHTML = ('Tarefa adicionada com sucesso!')
        }
    });

})

console.log(userList)