var TaskCreation = function(taskid){
    var id = taskid;
    var todoList = [];
    var uniqueId = 1;
    // Add a subtask to one of the main task
    function addSubTask(subTaskName){
        let taskObject = { id: uniqueId++, name: subTaskName, status: false };
        todoList[todoList.length] = taskObject;
        console.log(document.getElementById("pendingBody"+id));
        let pending_parent = document.getElementById("pendingBody"+id) ;
        let pending_child = `<div id="task_${id}div_${taskObject.id}" class="sub_task">
                                <input class="chk_box" type="checkbox" onclick="check(event)" id="task_${id}cb_${taskObject.id}">
                                <span class="task_nm">${taskObject.name}</span>
                                <button id="task_${id}rm_${taskObject.id}" onclick="remove(event)" class="remove">REMOVE</button>
                            </div>`;
        pending_parent.innerHTML += (pending_child);
        Calc_Progress();
    }

    function changeSubTaskState(event){
        console.log("Subtask id :"+event.target.id);
        let cb_id = event.target.id;
        let div_id = event.target.id.slice(9);

        let isChecked = document.getElementById(cb_id).checked;
        let index = -1;
        for (let i = 0; i < todoList.length; i++) {
            if (div_id == todoList[i].id) {
                index = i;
                break;
            }
        }

        if (isChecked) {
            todoList[index].status = true;
            let pending_parent = document.getElementById("pendingBody"+id);
            let pending_child = document.getElementById("task_"+id+"div_"+div_id);

            let completed_parent = document.getElementById("completedBody"+id);

            completed_parent.appendChild(pending_child);
        }
        else {
            todoList[index].status = false;
            let pending_parent = document.getElementById("pendingBody"+id);

            let completed_parent = document.getElementById("completedBody"+id);
            let completed_child = document.getElementById("task_"+id+"div_"+div_id);
            
            pending_parent.appendChild(completed_child);
        }
        Calc_Progress();
    }

    function removeSubTask(event){
        console.log("Remove "+id+" called..");
        var cb_id =event.target.id.replace("rm","cb");
        console.log(event.target.id.replace("rm","cb"));
        console.log("value of cb_id "+cb_id)
        console.log(document.getElementById(cb_id).checked);


        var isChecked = document.getElementById(cb_id).checked;
        if (isChecked){
            let completed_parent = document.getElementById("completedBody"+id);
            let completed_child = document.getElementById(cb_id.replace("cb","div"));

            console.log(completed_parent);
            console.log(completed_child);            

            completed_parent.removeChild(completed_child);

        }
        else{
            let pending_parent = document.getElementById("pendingBody"+id);
            let pending_child = document.getElementById(cb_id.replace("cb","div"));

            console.log(pending_parent);
            console.log(pending_child);

            pending_parent.removeChild(pending_child);

        }
        console.log("id of subtask in list :"+cb_id.slice(9))
        var index = Number(cb_id.slice(9))-1;
        console.log(todoList.find(ele =>(ele.id==cb_id.slice(9))));
        todoList[index].name = null;
        todoList[index].status = "removed";
        Calc_Progress();
    }
    
    function getId(){
        return id;
    }

    function Calc_Progress() {
        let pending = 0;
        let completed = 0;
        let percentage = 0;
        let progress = document.getElementById("pg_"+id);
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].status == true) {
                completed++;
            }
            else if (todoList[i].status == false) {
                pending++;
            }
        }
        if (pending == 0 && completed == 0) {
            console.log("yes");
            percentage = 0;
        }
        else {
            percentage = completed / (completed + pending);
            percentage = percentage * 100
            
        }
        progress.value = percentage.toString().slice(0,5)+"%";
    }

    return {
        addSubTask,
        changeSubTaskState,
        removeSubTask,
        getId
    }
}


var tasks=[]
var count = 0;
function createTask(){
    var taskName = prompt("Enter your task Name.")
    console.log(taskName);
    if(taskName){
        count++;
        var section = document.getElementById('tasks');
        // section.innerHTML=`<input type ='checkbox'/><lable>${taskName}</lable>`;
        let divEle= document.createElement('div');
        var task =`
                <section class="task" id="task${count}">
                    <header class ="task_header">   
                        ${taskName}
                    </header>
                        <button id="bt_${count}" value=${taskName} onclick="AddSubTask(event)">Add subTask </button>
                        <label>Progress</label><input id="pg_${count}" type="text" readonly />
                    <section class="taskSection">
                        <section class="pending_tasks" id="pending_tasks${count}">
                            <header class="pending_header">Pending Tasks</header>
                            <section class="pendingBody" id="pendingBody${count}"></section>
                        </section>
                        <section class="Completed_tasks" id="Completed_tasks${count}">
                            <header class="completed_header">Completed Tasks</header>
                            <section class="completedBody" id="completedBody${count}"><section>
                        </section>
                    </section>
                </section>        
        `;
        divEle.id=`div_task${count}`;
        divEle.innerHTML=task;
        if(count>1){
            section.appendChild(divEle);
            
        }
        else{
            section.innerHTML=task;
        }
        
        var task1 = TaskCreation(count);
        console.log("Task after creation  "+task1.getId())
        tasks.push(task1);

    }
    else{
        alert("Task name required")
    }
    
}

function AddSubTask(event){
    var subTaskName = prompt("Enter subTask Name for "+event.target.value)
    if(subTaskName){
        var currentTask =  tasks.find((task => task.getId()== event.target.id.slice(3)));
        currentTask.addSubTask(subTaskName);
    }
    else{
        alert("SubTask name required");
    }

}

function check(event) {
    //console.log("First -->"+ event.target.id);
    var v1 = event.target.id.replace("task_","");
    //console.log("After removing task_--->"+v1)
    v1 = v1.slice(0,v1.indexOf("cb"));
    //console.log("v1.slice --->"+v1)
    var currentTask =  tasks.find((task => task.getId()== v1));
    currentTask.changeSubTaskState(event);
}

// functionality to call remove subtask of coresponding task
function remove(event){
    //console.log(event.target.id);
    var v1=event.target.id.replace("task_","");
    //console.log("After removing task_--->"+v1);
    v1 = v1.slice(0,v1.indexOf("rm_"));
    //console.log("v1.slice -   id  of task -->"+v1);//
    var currentTask =  tasks.find((task => task.getId()== v1));
    currentTask.removeSubTask(event);
}