const $ = (elemento) => document.querySelector(elemento);

let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
let userList = JSON.parse(localStorage.getItem('userList'));
let taskTable = $('#taskTable')

// Validate date
function validateInputDate(dateInput, hourInput) {
    let d = dateInput.value.split('-')
    let h = hourInput.value.split(':')
    return new Date(d[0], d[1]-1, d[2], h[0], h[1])
}

function validateDate(dateInput, hourInput) {
    let d = dateInput.split('/');
    let h = hourInput.split(':');
    return new Date(d[2], d[1]-1, d[0], h[0], h[1])
}

// error and success messages
const msgError = $('#msgError');
const msgSuccess = $('#msgSuccess');

function msgErrorOrSuccess(eOrS, msg) {
    eOrS.setAttribute('style', 'display:block');
    eOrS.innerHTML = (msg)
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

submitTask.addEventListener('click', evnt => {
    evnt.preventDefault();

    // Error treatment
    let allFilled = 
        taskInput.value.length !== 0 &&
        descriptionInput.value.length !== 0 &&
        beginDateInput.value.length !== 0 &&
        beginHourInput.value.length !== 0 &&
        endDateInput.value.length !== 0 &&
        endHourInput.value.length !== 0;

    if (allFilled === false) {
        msgErrorOrSuccess(msgError, 'Preencha todos os campos')
        return;
    }

    // Validate date
    beginTime = validateInputDate(beginDateInput, beginHourInput)
    endTime = validateInputDate(endDateInput, endHourInput)

    if(beginTime > endTime) {
        msgErrorOrSuccess(msgError, 'O término deve ser depois do início da tarefa')
        return;
    }

    // create tasks
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
            let taskList = user.tasksReg
            taskList.push(tasks)
            msgErrorOrSuccess(msgSuccess, 'Tarefa adicionada com sucesso!')

            setTimeout(() => {
                window.location.reload();
            }, 1000); 
        }
    });

    localStorage.setItem('userList', JSON.stringify(userList))

})

let statusTask = ''
userList.forEach((user) => {
    if(user.emailReg == loggedUser.email) {
        // Table creation
        user.tasksReg.forEach((task) => {
            let today = new Date();
            beginTime = validateDate(task.beginDate, task.beginHour)
            endTime = validateDate(task.endDate, task.endHour)
            
            if(endTime > today && today > beginTime) {
                statusTask = 'class="text-primary">Em andamento'
            } else if (endTime < today) {
                statusTask = 'class="text-danger">Em Atraso'
            } else if (today < beginTime){
                statusTask = 'class="text-warning">Pendente'
            }

            user.completedTasks.forEach((taskCompleted) => {
                if(task.task == taskCompleted.task) {
                    statusTask = 'class="text-success">Realizada'
                }
            })

            let contentTable = document.createElement('tr')
            contentTable.innerHTML = `<tr>
            <td class="taskName" data-bs-toggle="modal" data-bs-target="#exampleModal">${task.task}</td>
            <td>${task.beginDate} às ${task.beginHour}</td>
            <td>${task.endDate} às ${task.endHour}</td>
            <td ${statusTask}</td>
            <td><button type="button" class="btn btn-warning btn-sm change-btn" data-task="${task.task}" data-beginDate="${task.beginDate}" data-beginHour="${task.beginHour}" data-endDate="${task.endDate}" data-endHour="${task.endHour}" data-description="${task.description}">Alterar</button></td>
            </tr>
            `

            taskTable.appendChild(contentTable)
            
        })

        // modal creation
        let taskNames = document.querySelectorAll('.taskName');
        let taskName = '';
        taskNames.forEach((task) =>
            task.addEventListener('click', (event) => {
                taskName = event.currentTarget.textContent

                user.tasksReg.forEach((task) => {
                    if(task.task === taskName) {
                        let modalTitle = $('#modal-title');
                        let modalBody = $('#modal-body');
                        modalTitle.innerHTML = task.task;
                        modalBody.innerHTML = task.description;
                    }
                })
            })
        );
        
        // change btn
        let changeBtns = document.querySelectorAll('.change-btn');        
        
        changeBtns.forEach(btn =>
            btn.addEventListener('click', (event) => {
                let taskData = {
                    task: '',
                    beginDate: '',
                    beginHour: '',
                    endDate: '',
                    endHour: '',
                    description: ''
                };

                
                taskData.task = event.currentTarget.getAttribute('data-task');
                taskData.beginDate = event.currentTarget.getAttribute('data-beginDate');
                taskData.beginHour = event.currentTarget.getAttribute('data-beginHour');
                taskData.endDate = event.currentTarget.getAttribute('data-endDate');
                taskData.endHour = event.currentTarget.getAttribute('data-endHour');
                taskData.description = event.currentTarget.getAttribute('data-description');
                localStorage.setItem('taskSelected', JSON.stringify(taskData))
                window.location.href = "./task_editor.html"
            }))
        
    }
})


