const $ = (elemento) => document.querySelector(elemento);

const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
let userList = JSON.parse(localStorage.getItem('userList'));
let taskSelected = JSON.parse(localStorage.getItem('taskSelected'));

// Input tasks
let taskInput = $('#newTask');
let beginDateInput = $('#newBeginDate');
let beginHourInput = $('#newBeginHour');
let endDateInput = $('#newEndDate');
let endHourInput = $('#newEndHour');
let descriptionInput = $('#newDescription');
const changeBtn = $('#changeBtn');
const deleteBtn = $('#deleteBtn');
const doneBtn = $('#doneBtn');
const notDoneBtn = $('#notDoneBtn');
const cancelBtn = $('#cancelBtn');

userList.forEach(user => {
    user.completedTasks.forEach(completeTask => {
        if (completeTask.task == taskSelected.task) {
            doneBtn.setAttribute('style', 'display:none');
            notDoneBtn.setAttribute('style', 'display:inline');
        } else {
            doneBtn.setAttribute('style', 'display:inline');
            notDoneBtn.setAttribute('style', 'display:none');
        }
    })
})

// Initial input fields
taskInput.value = taskSelected.task;
beginDateInput.value = taskSelected.beginDate;
beginHourInput.value = taskSelected.beginHour;
endDateInput.value = taskSelected.endDate;
endHourInput.value = taskSelected.endHour;
descriptionInput.value = taskSelected.description;

const msgError = $('#msgError');
const msgSuccess = $('#msgSuccess');

function msgErrorOrSuccess(eOrS, msg) {
    eOrS.setAttribute('style', 'display:block');
    eOrS.innerHTML = (msg)
}

let validTask, validBeginDate, validBeginHour, validEndDate, validEndHour, validDescrption = false;

// wrong page
if (localStorage.getItem('taskSelected') == null) {
    alert('Você precisa selecionar uma tarefa para acessar essa página');
    window.location.replace('./task_manager.html');
}

// cancel editing
function cancelTask() {
    window.location.replace('./task_manager.html');
    localStorage.removeItem('taskSelected');
}

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

// change task
changeBtn.addEventListener('click', evnt => {
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

    // create new task
    let tasks = {
        task: taskInput.value,
        beginDate: beginDateInput.value.split('-').reverse().join('/'),
        beginHour: beginHourInput.value,
        endDate: endDateInput.value.split('-').reverse().join('/'),
        endHour: endHourInput.value,
        description: descriptionInput.value
    }

    userList.forEach(user => {
        user.tasksReg.forEach(task => {
            if(task.task == taskSelected.task) {
                task.task = tasks.task;
                task.beginDate = tasks.beginDate;
                task.beginHour = tasks.beginHour;
                task.endDate = tasks.endDate;
                task.endHour = tasks.endHour;
                task.description = tasks.description;
            }
        })
    });
    localStorage.setItem('userList', JSON.stringify(userList));
    msgErrorOrSuccess(msgSuccess, 'Tarefa alterada com sucesso!');

    setTimeout(() => {
        cancelTask()
    }, 1000);
});

// delete task
deleteBtn.addEventListener('click', () =>{
    const yesDelete = $('#yesDelete')

    yesDelete.addEventListener('click', () => {
        userList.forEach(user => {
            user.tasksReg.forEach(task => {
                if(task.task == taskSelected.task) {
                    let indexTask = user.tasksReg.indexOf(task);
                    if (indexTask > -1) {
                        user.tasksReg.splice(indexTask, 1);
                    } else {
                        return;
                    }
                }
            })
        });
    

        localStorage.setItem('userList', JSON.stringify(userList));
        msgErrorOrSuccess(msgError, 'Tarefa excluída');

        setTimeout(() => {
            cancelTask()
        }, 1000);
    });
    

})

// done task
doneBtn.addEventListener('click', () => {
    userList.forEach(user => {
        user.tasksReg.forEach(task => {
            if(task.task == taskSelected.task) {
                user.completedTasks.push(taskSelected)
            }
        })
    })
    localStorage.setItem('userList', JSON.stringify(userList));
    msgErrorOrSuccess(msgSuccess, 'Status alterado com sucesso!');

    setTimeout(() => {
        cancelTask()
    }, 1000);
})

// not done task
notDoneBtn.addEventListener('click', () => {
    userList.forEach(user => {
        user.completedTasks.forEach(task => {
            if(task.task == taskSelected.task) {
                let indexTask = user.completedTasks.indexOf(task);
                console.log(indexTask)
                if (indexTask > -1) {
                    user.completedTasks.splice(indexTask, 1);
                } else {
                    return;
                }
            }

        })
    })
    localStorage.setItem('userList', JSON.stringify(userList));
    msgErrorOrSuccess(msgSuccess, 'Status alterado com sucesso!');

    setTimeout(() => {
        cancelTask()
    }, 1000);
})