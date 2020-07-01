- What is the value of joinedValue variable and why?
     - var joinedValue = new Array(256).join(' ');
        - It Returns a string with 255 white spaces. The reason is if any element is undefined it replace with ''.

    - var joinedValue = new Array(256).join('a');
        - It Returns a string with 255 'a'. The reason is if any element is undefined it replace with ''.
- What is the output of below code?
    ```js 
        var a;
        console.log(a+'a');
        
        output :  undefined
    ```    
- Check for Array-ness:
    ```js
    console.log(typeof [1, 2]); // "object"
    ```
    - Then how to check whether a variable is an arry or not?
        - ECMAScript 5(ES-6) defines a new method Array.isArray(), which returns true if the argument is an array.        
        ```js
          Array.isArray([]); // true

          // trying to fool the check
          // with an array-like object
          Array.isArray({
           length: 1,
           "0": 1,
           slice: function () {}
          }); // false
               /*
               If this new method is not available in your environment, you can make the check by
               calling the Object.prototype.toString() method. If you invoke the call() method of
               toString in the context of an array, it should return the string “[object Array]”. If the
               context is an object, it should return the string “[object Object]”. So you can do something
               like this:
               */
          if (typeof Array.isArray === "undefined") {
           Array.isArray = function (arg) {
           return Object.prototype.toString.call(arg) === "[object Array]";
           };
          }
       ```

