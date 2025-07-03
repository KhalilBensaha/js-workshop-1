let tasks = [
    {
        idTask : 1,
        taskContent : 'Learn html',
        completed : false
    },
    {
        idTask : 2,
        taskContent : 'Learn HTML 5',
        completed : true
    },
    {
        idTask : 3,
        taskContent : 'Learn Css',
        completed : false
    }, 
    {
        idTask : 4,
        taskContent : 'Learn Css3',
        completed : false
    },
    {
        idTask : 5,
        taskContent : 'Learn JavaScript basics', 
        completed : false
    }
];


///Show tasks 
const tasksDiv = document.querySelector('.tasks');

function generateTask(task){
    let completedClass = '';
    if(task.completed){
        completedClass = 'completed';
    }
    return (
        `
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12 task-cart">
            <div class="task ${completedClass} task-${task.idTask}">
                <div class="task-description" onclick="changeTaskState(${task.idTask})">
                    ${task.taskContent}
                </div>
                <div class="task-actions">
                    <div class="task-action edit-action">
                        <a class="btn edt-btn" onclick="showModal(${task.idTask})">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </a>
                    </div>
                    <div class="task-action delete-action">
                        <a class="btn rm-btn" onclick="deleteTask(${task.idTask})">
                            <i class="fa-solid fa-trash-can"></i>
                        </a>
                    </div>
                    <div class="task-action show-action">
                        <a class="btn shw-btn">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `
    )
}

function showTasks(){
    tasksDiv.innerHTML='';
    tasks.forEach((task) => {
        tasksDiv.innerHTML += generateTask(task);
    });
}

showTasks();

/// Complete task or not
const taskDivs = document.querySelectorAll('.task');

function changeTaskState(idTask){
    let indexOfTask = tasks.findIndex((task) => task.idTask == idTask);
    /// tasks[indexOfTask].completed = !tasks[indexOfTask].completed;
    if(tasks[indexOfTask].completed==true){
        tasks[indexOfTask].completed=false;
    }else{
        tasks[indexOfTask].completed = true;
    }
    showTasks();
}

//// Add task
const taskInput = document.querySelector('.task-input'),
      errorMessageHtmlElement = document.querySelector('.error-message');

function getMaxIdTask(){
    return tasks[tasks.length - 1].idTask;
}
function addTask(){
    if(taskInput.value===''){
        errorMessageHtmlElement.textContent = `You should write a task name`;
    }else{
        let newTask = {
            idTask : getMaxIdTask()+1,
            taskContent : taskInput.value,
            completed : false
        }
        tasks.push(newTask); /// Add new task to tasks table ==> Add to database table
        ///tasksDiv.innerHTML += generateTask(newTask);
        showTasks();
        errorMessageHtmlElement.textContent = '';
        taskInput.value='';

        ///Showing and hiding toast
        showToast(`Task: ${newTask.taskContent} successfully added  <i class="fa-solid fa-check"></i>`);
        hideToast();
    }
}

const toastDiv = document.querySelector('.toast'),
      toastText = document.querySelector('.toast-text');

function showToast(message){
    toastDiv.style.display = 'block';
    toastText.innerHTML = message;
}

function hideToast(){
    setTimeout(()=>{
        toastDiv.style.display = 'none';;
    }, 2000);
}

///Delete task
function deleteTask(idTask){
    let indexOfTask = tasks.findIndex((task) => task.idTask == idTask),
        deletedTask = tasks[indexOfTask];
    tasks.splice(indexOfTask, 1); /// index of task = idTask - 1
    showTasks();
    showToast(`Task: ${deletedTask.taskContent} successfully deleted  <i class="fa-solid fa-check"></i>`);
    hideToast();
}

const modal = document.querySelector('.modal'),
      updateTask = document.querySelector('.update-task'),
      updateTaskInput = document.querySelector('.update-task-input');

let updateTaskIndex;

function showModal(idTask){

    updateTaskIndex = tasks.findIndex((task) => task.idTask == idTask);
    let selectedTask = tasks[updateTaskIndex];

    updateTaskInput.value = selectedTask.taskContent;

    modal.classList.remove('d-none');

    setTimeout(() => {
        updateTask.classList.add('zoom-in');
    }, 150);
}

function hideModal(){
    updateTask.classList.remove('zoom-in');

    setTimeout(() => {
        modal.classList.add('d-none');
    }, 300);
}

function updateTaskAction(){
    if(updateTaskInput.value != '' && updateTaskInput.value != tasks[updateTaskIndex].taskContent){
        tasks[updateTaskIndex].taskContent = updateTaskInput.value;
        showTasks();
        hideModal();
        showToast(`Task N: ${updateTaskIndex+1} updated successfully <i class="fa-solid fa-check"></i>`);
        hideToast();
    }else{
        console.log('error');
    }
}





