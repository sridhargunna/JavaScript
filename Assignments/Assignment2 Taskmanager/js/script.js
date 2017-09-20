var _tags = [];
var _tasks = [];
var taskId = 1;
var updateRow;

function addTagToTagsSection(tag){    
    var tags = document.getElementById('tags');
    _tags.push(tag);
    var tagX = document.createElement('a');
    tagX.setAttribute("class", "removeTag");
    tagX.setAttribute("href", "#");
    tagX.textContent = 'X';
    var tagLabel = document.createElement("label");
    tagLabel.textContent = tag + " ";
    tags.appendChild(tagLabel);
    tags.appendChild(tagX);
    tagX.onclick = function(){
        tags.removeChild(tagLabel);
        tags.removeChild(tagX);
        var index = _tags.indexOf(tag);
        _tags.splice(index,1);
    } 
}

var addTag = function() {
    var tagElement = document.getElementById('tag');
    var tag = tagElement.value;
    if(tag){
        addTagToTagsSection(tag);
        tagElement.value="";
      }
    else{
        alert("Tag required..!")
    }
        return false;
}

function Update(){
	var bt = document.getElementById('saveButton');
    console.log(updateRow.rowIndex);
    var taskIndex = updateRow.rowIndex-1;
    console.log(_tasks[taskIndex]);
    var updateTask = _tasks[taskIndex];
    var taskName = document.getElementById("taskName");
    var taskStatus = document.getElementById("status");
    if(taskName.value){
        updateTask.name =  taskName.value;
        updateTask.status = taskStatus.value=="true";
        updateTask.tags = _tags;
        var tbody =  updateRow.parentNode;
        taskName.value="";
        taskStatus.value = false;
        _tags=[];
        var tags = document.getElementById('tags');
        tags.textContent="";
        addToTable(updateTask,updateRow);
    }
    bt.onclick = addTask;

}

var addTask = function addTask(){
    var taskName = document.getElementById("taskName");
    var taskStatus = document.getElementById("status");
    if(taskName.value){
        var task = { id : taskId++, name : taskName.value, status:taskStatus.value=="true",tags : _tags};
        _tasks.push(task);
        taskName.value="";
        taskStatus.value = false;
        _tags=[];
        var tags = document.getElementById('tags');
        tags.textContent="";
        addToTable(task);
    }
    else{
        alert("Task name is required..!")
    }
}

function addToTable(task,oldRow){
    var row = document.createElement('tr');
    // create a first column 
    var completedColumn = document.createElement('td');
    // create checknox 
    var statusCheckbox = document.createElement('input');
    statusCheckbox.setAttribute("type","checkbox");
   
     
    // add the checkbox to first column 
    completedColumn.appendChild(statusCheckbox);
    // add this column to row
    row.appendChild(completedColumn);

    var nameColumn = document.createElement('td');
    nameColumn.textContent = task.name;
    row.appendChild(nameColumn);

    var tagsColumn = document.createElement('td');
    var tags = task.tags.join(', ');
    tagsColumn.textContent = tags;
    row.appendChild(tagsColumn);

    var statusColumn = document.createElement('td');
    if(task.status){
        statusColumn.textContent = "Completed"
        statusCheckbox.setAttribute("checked",true);
    }
    else{
        statusColumn.textContent = "Pending";
        statusCheckbox.checked = false;
    }
    row.appendChild(statusColumn);
    
    var actionColumn = document.createElement('td');
    var editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.setAttribute("class", "actionButton");
    actionColumn.appendChild(editButton);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = "DELETE";
    deleteButton.setAttribute("class", "actionButton");
    actionColumn.appendChild(deleteButton);
    
    row.appendChild(actionColumn);

    var tbody = document.getElementById('tableBody');
    // If it need to updated replace the old row with new row. Else create new row.
    if(oldRow){
        tbody.replaceChild(row,oldRow);
    }
    else{
        tbody.appendChild(row);

    }

    deleteButton.onclick = function(){
       var isRemovable = confirm("Do you want to delete?");
       if(isRemovable){  
           console.log("Before ");       
           console.log(_tasks);
           //console.log(_tasks.findIndex(elem=>elem.id==task.id));
           _tasks.splice(_tasks.findIndex(elem=>elem.id==task.id),1);
           console.log("After "); 
           console.log(_tasks);          
           tbody.removeChild(row);
        }
        calculateProgress();
    }

    editButton.onclick = function(){
            var taskName = document.getElementById("taskName");
            var taskStatus = document.getElementById("status");
            var tags = document.getElementById('tags');
            tags.textContent = "";
            taskName.value = task.name;
            taskStatus.value = task.status;
            var tagsArray=task.tags;
        for(tag of tagsArray){
            addTagToTagsSection(tag)
            }
            console.log(this.parentNode.parentNode);
            updateRow = this.parentNode.parentNode;
                var bt = document.getElementById('saveButton');
                bt.onclick = Update; 
        }

    statusCheckbox.onchange =function() {
        if(statusCheckbox.checked){
            task.status = true;
            statusColumn.textContent = "Completed"
        }
        else{
                task.status = false;
                statusColumn.textContent = "Pending";
        }
        console.log(_tasks);
        console.log(task.name);
        calculateProgress();
    }
    console.log(_tasks); 
    calculateProgress();   
}


function deleteComplete(){
    var isRemovable = confirm("Do you want to delete all completed tasks?");
    var tbody = document.getElementById('tableBody');    
    if(isRemovable){  
        var indexes = [];
        var names = [];
        var len = _tasks.length;
        // Loop through all tasks of _tasks array. 
            //  1. First check whether the status of the current task is true.
            //      i. If it is true delete it from array and remove that row from table. But dont update index value because if we remove element form array 
            //         the next element shifted to current index position so we need to check it's status also. If we increment the i value we miss the next element.
            //      ii. If it false now increment the i value.
        for(var i=0;i<len;){
           currrentTask = _tasks[i];
           if(currrentTask && currrentTask.status){
            console.log("Before ");       
            console.log(_tasks);
            names.push(currrentTask.name);
            var index = _tasks.findIndex(elem=>elem.id==currrentTask.id)
            console.log("index"+index);
            _tasks.splice(index,1);           
            console.log("After "); 
            console.log(_tasks);        
            tbody.deleteRow(index);
           }
           else{
               i++;
           }
        }
        console.log(names);
        calculateProgress();
    }
}

// Referece from w3school https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_table
function myFunction(value) {
  var input, filter, table, tr, td, i;
  input = document.getElementById("sertchBox");
  filter = input.value.toUpperCase();
  var startcolumn = 1;
  if(value){
    filter = value.toUpperCase();
    startcolumn = 3;
  }
  table = document.getElementById("tableBody");
  tr = table.getElementsByTagName("tr");
  if(filter==""){
      for (i = 0; i < tr.length; i++) {
          tr[i].style.display = "";
      }
  }  
  for (i = 0; i < tr.length; i++) {
    var displayStyle = "none";
    for(var j=startcolumn;j<4;j++){
        td = tr[i].getElementsByTagName("td")[j];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                displayStyle = "";
                break;                
            }
        }
    }
    tr[i].style.display = displayStyle;
  }
}

function showPending(){
    var pendingCheckbox = document.getElementById('pendingCb');
    if(pendingCheckbox.checked){
        myFunction("Pending");
    }
    else{
        myFunction("");
    }
}

function calculateProgress(){
    var completed = 0;    
    var all = _tasks.length;
    var pending =0;
    for(task of _tasks){
        if(task.status){
            completed++;
        }
        else{
            pending++;
        }
    }
    document.getElementById('tasksPending').value = pending;
    document.getElementById('tasksCompleted').value = completed;
    var progress = document.getElementById('tasksProgress');
    if(all==0){
        progress.value = 0;
    }
    else{
        progress.value =((completed/all)*100).toFixed(2);
    }
}