let taskName = document.getElementById("taskName");
let taskDate = document.getElementById("taskDate");
let taskTime = document.getElementById("taskTime");
let taskContainer = document.getElementById("taskContainer");

const task = {
    taskId:"",
    taskName:"",
    taskDate:"",
    taskTime:"",
}

const userTask = {
    allTasks: [],
    addTask: (newTask) => { 
        userTask.allTasks.push(newTask);
        userTask.saveTasks(newTask);
    },
    saveTasks: () => {
        localStorage.setItem("tasks", JSON.stringify(userTask.allTasks));
    },
    loadTasks: () => {
       // userTask.allTasks = JSON.parse(localStorage.getItem("tasks"));
        //counter = userTask.allTasks.length;
    },
    get divBuilder(){
        let divStr = "";
        this.allTasks.map((item) => {
            divStr += `
            <div id= ${item.taskName} class = "addNote">
            <div class="glyphicon glyphicon-remove-circle" onclick="userTask.deleteTask(${item.taskId})" id="x">x</div>
                <div class="theNote">
                <span id = "noteName">${item.taskName}</span><br/>
                <span id = "noteDate">${item.taskDate}</span>
                <span id = "noteTime">${item.taskTime}</span>
                </div>
            </div>
            `
    });
    return divStr;
    },
    redraw: ()=> {
        let taskContainer = document.getElementById("taskContainer");
        taskContainer.innerHTML = userTask.divBuilder;
    },
    deleteTask: (number) => {
        var tempTasks = [];
        for (var i = 0; i < userTask.allTasks.length; i += 1) {
        if (userTask.allTasks[i].taskId != number) {
            tempTasks.push(userTask.allTasks[i]);
        }
        }
        userTask.allTasks = tempTasks;
        userTask.saveTasks();
        userTask.redraw();
    },

    //deleteTask: ()=> {
       // let tempTasks = JSON.parse(localStorage.getItem("tasks"));
        //delete tempTasks.taskId;
       // console.log(tempTasks);
       // userTask.allTasks = tempTasks;
   // userTask.saveTasks();
   // userTask.redraw();
   // },
}