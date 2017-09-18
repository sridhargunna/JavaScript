- What is the value of joinedValue variable and why?
     - var joinedValue = new Array(256).join(' ');
        - It Returns a string with 255 white spaces. The reason is if any element is undefined it replace with ''.

    - var joinedValue = new Array(256).join('a');
        - It Returns a string with 255 'a'. The reason is if any element is undefined it replace with ''.
- What is the output of below code?
    ```js 
        var a;
        console.log(a+'a');
        
        output :  undefineda
    ```    
- Check for Array-ness
    ```js
    console.log(typeof [1, 2]); // "object"
    ```
    - Then how to check whether a variable is an arry or not?
        - ECMAScript 5 defines a new method Array.isArray(), which returns true if the argument is an array.
