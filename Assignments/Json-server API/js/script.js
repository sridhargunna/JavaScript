/**
 * IIF to intialize and attach event handlers.
 */
(function () {
    // Arrays to store tags and tasks
    var _tags = [];
    var _tasks = [];

    // Buttons
    var tagSaveButton = document.getElementById("bt_savetag");
    var taskSaveButton = document.getElementById("bt_savetask");
    var sertchSection = document.getElementById("sertchBox");
    var pending = document.getElementById("pendingCb");
    var deleteAll = document.getElementById("deleteCompleted");
    var clearAll = document.getElementById("bt_clear");

    // Form inputs
    var taskName = document.getElementById("name_txt");
    var taskStatus = document.getElementById("status_option");
    var taskTags = document.getElementById('tags');

    // Row to update
    var updateRow;

    tagSaveButton.onclick = addTags;    
    pending.onclick = showPending;
    taskSaveButton.onclick  = saveTask;
    deleteAll.onclick = deleteComplete;
    clearAll.onclick = Clear;
    /**
     * Return : It returns a new Task object
     * @param {Name of the task} name 
     * @param {Array of tags for the task} tags 
     * @param {Status of the task} isCompleted 
     */
    var Task = function (name,tags,status){
        if(!(this instanceof arguments.callee)){
            return new arguments.callee(id,name,tags,status)
        }
        this.name = name;
        this.tags = tags;
        this.status = status;
    }
    
    /**
     * It add the task to server and insert the task into _tasks
     * @param {task to store in server} task 
     */
    var postTaskToDB = function (task) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
                console.log("In if")            
                var taskObj = JSON.parse(this.responseText);
                _tasks.push(taskObj);
                addToTable(taskObj);            
            }
        };
        xhttp.open("POST", "http://localhost:3000/tasks/", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(task));        
    }

    function loadTasksFromDB(){
        return new Promise( function (resolve,reject){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    _tasks = JSON.parse(this.responseText);
                    resolve(_tasks);
                }
            };
            xhttp.open("GET", "http://localhost:3000/tasks/", true);
            xhttp.send();
        });
    }

    /**
     * It updates the task in db
     * @param {Id of the task to update } id 
     */
    function updateInDb(task){
        return new Promise( function (resolve,reject){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 &&  (this.status == 201 || this.status == 200) ) {
                    resolve(this.responseText);
                }
            };            
            var json = JSON.stringify(task);
            xhttp.open("PUT", "http://localhost:3000/tasks/"+task.id, true);
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.send(json);
        });
    }

    function deleteFromDb(id){
        return new Promise( function (resolve,reject){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(this.responseText);
                }
            };
            xhttp.open("DELETE", "http://localhost:3000/tasks/"+id, true);
            xhttp.send();
        });
    }


    function deleteComplete(){
        var isRemovable = confirm("Do you want to delete all completed tasks?");
        var tbody = document.getElementById('tableBody');    
        if(isRemovable){  
            var indexes = [];
            var names = [];
            var len = _tasks.length;    
            /**
             * Loop through all tasks of _tasks array.
             *  1. First check whether the status of the current task is true.
             *        i. If it is true delete it from array and remove that row from table. But dont update index value because if we remove element form array
             *           the next element shifted to current index position so we need to check it's status also. If we increment the i value we miss the next element.
             *       ii. If it false now increment the i value.
             */
            for(var i=0;i<len;){
                currrentTask = _tasks[i];
                if(currrentTask && currrentTask.status){
                    names.push(currrentTask.name);
                    var index = _tasks.findIndex(elem=>elem.id==currrentTask.id)
                    deleteFromDb(currrentTask.id);
                     _tasks.splice(index,1);         
                    tbody.deleteRow(index);
                }
                else{
                    i++;
                }
            }
            calculateProgress();
        }
    }
    /**
     * Execute the function on pageload to get all tasks from db and update array.
     * It executes only once.
     * 
     */
    (function () {
        let promise = loadTasksFromDB();
        promise.then(function(tasks){
            for(task of tasks){
                addToTable(task);
                console.log(task);
            }
        });
    }());


    function addTagToTagsSection(tag){    
        _tags.push(tag);
        var tagX = document.createElement('a');
        tagX.setAttribute("class", "removeTag");
        tagX.setAttribute("href", "#");
        tagX.textContent = 'X';
        var tagLabel = document.createElement("label");
        tagLabel.textContent = tag + " ";
        taskTags.appendChild(tagLabel);
        taskTags.appendChild(tagX);
        tagX.onclick = function(){
            taskTags.removeChild(tagLabel);
            taskTags.removeChild(tagX);
            var index = _tags.indexOf(tag);
            _tags.splice(index,1);
        } 
    }

    function addTags() {
        var tagElement = document.getElementById('tag');
        var tag = tagElement.value;
        if(tag){
            addTagToTagsSection(tag);
            tagElement.value="";
        }
        else{
            alert("Tag required..!")
        }        
    }

    function Clear() {
        taskName.value="";
        taskStatus.value = false;
        taskTags.textContent="";
        _tags = [];
        taskSaveButton.onclick = saveTask;
    }


    function saveTask() {
        var currentTask = new Task(taskName.value,_tags,taskStatus.value=="true");
        if(taskName.value){
            if(taskName.value.length<100){
                postTaskToDB(currentTask);

                // Clearing the vaues
                Clear();               
            }
            else{
                alert("Task name should not be greatere than 100 characters ..!")
            }
        }
        else{
            alert("Task name is required..!");
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
        var tagValues = task.tags.join(', ');
        tagsColumn.textContent = tagValues;
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
                deleteFromDb(task.id);
                _tasks.splice(_tasks.findIndex(elem=>elem.id==task.id),1);        
                tbody.removeChild(row);
            }
            calculateProgress();
        }

        editButton.onclick = function(){
                taskTags.textContent = "";
                taskName.value = task.name;
                taskStatus.value = task.status;
                var tagsArray=task.tags;
                for(tag of tagsArray){
                    addTagToTagsSection(tag)
                }
                updateInDb(task);
                updateRow = this.parentNode.parentNode;
                taskSaveButton.onclick = Update; 
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
            let promise = updateInDb(task);
            promise.then(function(){
                calculateProgress();
            });            
        }

        // TO calculate progress for every addition and updation of task
        calculateProgress();

        // To check whether the filer is applied or not 
        showPending();
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

    // Referece from w3school https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_table
    function searchFunction(value) {
        var input, filter, table, tr, td, i;
        input = document.getElementById("sertchBox");
        filter = input.value.toUpperCase();
        var startcolumn = 1;
        if(value){
            filter = value.toString().toUpperCase();
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

    /**
     * Need to improve the logic
     * To call searchFunction without parameter
     */
    sertchSection.onkeyup = function(){
        searchFunction();
    }

    function showPending(){
        var pendingCheckbox = document.getElementById('pendingCb');
        if(pendingCheckbox.checked){
            searchFunction("Pending");
        }
        else{
            searchFunction("");
        }
    }

    function Update(){
        console.log(updateRow.rowIndex);
        var taskIndex = updateRow.rowIndex-1;
        console.log(_tasks[taskIndex]);
        var updateTask = _tasks[taskIndex];
        if(taskName.value){
            updateTask.name =  taskName.value;
            updateTask.status = taskStatus.value=="true";
            updateTask.tags = _tags;
            updateInDb(updateTask);
            Clear();
            addToTable(updateTask,updateRow);
        }
        taskSaveButton.onclick = saveTask;
    }
})();
