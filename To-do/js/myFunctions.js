function sendData(){
    let myCounter = Number(localStorage.getItem("counter"));
    if (myCounter == null) {
        localStorage.setItem("counter", 0);
    } else {
        localStorage.setItem("counter", myCounter += 1);
    }
    let newTask = {...task};
    newTask.taskId = myCounter;
    newTask.taskName = taskName.value;
    newTask.taskDate = taskDate.value;
    newTask.taskTime = taskTime.value;
    userTask.addTask(newTask);
    userTask.redraw();
    userTask.deleteTask();
};

function init(){
    if (localStorage.getItem("tasks")){
        userTask.allTasks= JSON.parse(localStorage.getItem("tasks"));
        userTask.redraw();
        
    } else
    userTask.allTasks= [];
}
