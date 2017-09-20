function fun() {
    console.log("Hello."); // Say "Goodbye" two seconds from now. 
    setTimeout(function () { console.log("Goodbye!"); }, 2000); // Say "Hello again!" 
    console.log("Hello again!");
}

/**
 * Promises
 */

/**
 * Creating a Promise
 */
var isMomHappy = false;

// Promise
var willIGetNewPhone = new Promise(
    // the function is executed automatically when the promise is constructed
    function (resolve, reject) {
        setTimeout(function () {
            if (isMomHappy) {
                var phone = {
                    brand: 'Samsung',
                    color: 'black'
                };
                alert('Why????????????????');
                resolve(phone); // fulfilled
            } else {
                var reason = new Error('mom is not happy');
                reject(reason); // reject
            }
        }, 5000);
    }
);

/**
 * Consuming Promises
 */
var askMom = function () {
    willIGetNewPhone
        .then(function (fulfilled) {
            // yay, you got a new phone
            console.log(fulfilled);
            // output: { brand: 'Samsung', color: 'black' }
        })
        .catch(function (error) {
            // oops, mom don't buy it
            console.log(error.message);
            console.log()
            // output: 'mom is not happy'
        });
};

function changeState() {
    isMomHappy = !isMomHappy;
}
//askMom();
/*

new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)
  
  setTimeout(function(){console.log(result);return result * 2;},3000);// 1
  

}).then(function(result) { // (***)
  setTimeout(function(){console.log(result);return result * 2;},3000);

}).then(function(result) {
  setTimeout(function(){console.log(result);return result * 2;},3000);

});


-------------------------------------------------------------
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});

*/