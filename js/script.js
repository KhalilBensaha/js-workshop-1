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

// get the error message
let errorMessage = document.querySelector('.error-message');

function addTask(){
    let taskName = document.querySelector('.task-input').value;
    if(taskName.trim() === ''){
        errorMessage.textContent = 'Please enter a task name';
    }
    else{
        let newTask = {
            idTask : tasks.length + 1,
            taskContent : taskName,
            completed : false
        };
        tasks.push(newTask);
        console.log(tasks);
        errorMessage.textContent = '';
        showTasks();
        document.querySelector('.task-input').value = '';
        showToast(`Task: ${newTask.taskContent} successfully added  <i class="fa-solid fa-check"></i>`);
        hideToast();
    }
};

// add the task
let taskDiv = document.querySelector('.tasks');

function generateTask(task){
    let completedClass = task.completed ? 'completed' : '';
    return (
        `
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12 task-cart">
            <div class="task ${completedClass} task-${task.idTask}" onclick="changeTaskState(${task.idTask})">
                <div class="task-description">
                    ${task.taskContent}
                </div>
                <div class="task-actions">
                    <div class="task-action edit-action">
                        <a class="btn edt-btn">
                            <i class="fa-solid fa-pencil"></i>
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
};

function showTasks(){
    taskDiv.innerHTML = '';
    tasks.forEach(task => {
        taskDiv.innerHTML += generateTask(task);
    });
};

// show the tasks
showTasks();

// complete the task
function changeTaskState(idTask){
    tasks.forEach(task => {
        if(task.idTask === idTask){
            task.completed = !task.completed;
        }
    });
    showTasks();
};

// delete the task
function deleteTask(idTask){
    tasks = tasks.filter(task => task.idTask !== idTask);
    showTasks();
    showToast(`Task: ${tasks.taskContent} successfully deleted  <i class="fa-solid fa-check"></i>`);
    hideToast();
};

function showToast(message){
    let toast = document.querySelector('.toast');
    toast.innerHTML = message;
    toast.style.display = 'block';
};

// // edit the task
// function editTask(idTask){
//     tasks.forEach(task => {
//         if(task.idTask === idTask){
//             task.taskContent = document.querySelector('.task-input').value;
//         }
//     });
//     showTasks();
// };

/******************************************** */

// hide the toast
function hideToast(){
    let toast = document.querySelector('.toast');
    setTimeout(()=>{
        toast.style.display = 'none';;
    }, 2000);
};








