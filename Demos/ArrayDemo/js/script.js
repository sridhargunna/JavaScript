var array = [];
var sum =0;

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
    if(item && (!isNaN(item))){   
        /**
         * push(...items: T[]): number;
         * Appends new elements to an array, and returns the new length of the array.
         * @param items New elements of the Array.
         */
        array.push(Number(item));  
        updateArray(); 
        input.value = ""; 
        console.log(array);
    }
    else{
        alert('Please enter valid number in the input box')
    }
    
}

function popFromArray() {
    if(array.length){
        /**
         * pop(): T | undefined;
         * Removes the last element from an array and returns it.
         */
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
    if(item && (!isNaN(item))){
        /**
         * unshift(...items: T[]): number;
         * Inserts new elements at the start of an array.
         * @param items  Elements to insert at the start of the Array.
         */
        array.unshift(Number(item));  
        updateArray(); 
        input.value = ""; 
    }
    else{
        alert('Please enter value in the input box')
    }
}

function shiftFromArray() {
    if(array.length){
        /**
         * shift(): T | undefined;
         * Removes the first element from an array and returns it.
         */
        array.shift();
        updateArray();
    }
    else{
        alert('Empty aarray...!')
    }
}

function forEachArray() {
    array.forEach(add);
    alert("Sum : "+sum);
}

function add(number) {
  sum += number;
}