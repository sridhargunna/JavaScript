var array = [];

function updateArray(){
    var output = document.getElementById('arrayOutput');
    output.innerHTML="";
    for(item of array){
        var element = document.createElement('data');
        element.setAttribute('class','element');
        element.textContent = item;
        output.appendChild(element);
    }
}

function pushToArray(){
    var input = document.getElementById('arrayInput');
    var item = input.value;
    if(item){
        array.push(item);  
        updateArray(); 
        input.value = ""; 
    }
    else{
        alert('Please enter value in the input box')
    }
    
}

function popFromArray() {
    if(array.length){
        array.pop();
        updateArray();
    }
    else{
        alert('Empty aarray...!')
    }
}

function unshiftFromArray(params) {
    var input = document.getElementById('arrayInput');
    var item = input.value;
    if(item){
        array.unshift(item);  
        updateArray(); 
        input.value = ""; 
    }
    else{
        alert('Please enter value in the input box')
    }
}

function shiftFromArray() {
    if(array.length){
        array.shift();
        updateArray();
    }
    else{
        alert('Empty aarray...!')
    }
}