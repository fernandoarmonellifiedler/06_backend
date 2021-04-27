/* Path Module:
- Node has some built-in useful modules (oficial node API documentation). I/e:
* File System: to create files
* HTTP: to create web servers for HTTP requests
* OS: to work with operating system
* Path
* Process: gives us information about the curent process
* Query Strings: very useful in building HTTP services
* Stream: allows us to work with streams of data

- In Path we have multiple functions. We´re gonna use the path.parse(path) method.
- So in app.js we write: */

const path = require('path');

/*- arguments that we pass to the require function Node assumes that this is a built-in module. If there isn´t, node will search for the existance of a related path to a file in this app.
- this is an object with a bunch of useful methods. I/e: */

var pathObj = path.parse(__filename); // argument of the module wrapper function stored on the variable pathObj
console.log(pathObj);

/* we get the following object:

{
    root: 'C:\\',
    dir: 'C:\\Users\\Marcelo\\Documents\\Fernando\\repositorios-github\\node-js\\m
  osh-tutorial\\first-app',
    base: 'app.js',
    ext: '.js',
    name: 'app'
  }

*/