
function AddTasks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML =
        this.responseText;
        console.log(this.responseText);
        }
    };
    var task = {name:"Shoping",tags:["DMART","Shop2"],isCompleted:true};
    xhttp.open("POST", "http://localhost:3000/tasks/", true);
    console.log(JSON.stringify(task));
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(task));
}

function Load(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML =
        this.responseText;
        console.log(this.responseText);
        }
    };
    xhttp.open("GET", "http://localhost:3000/tasks/", true);
    xhttp.send();
}