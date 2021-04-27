/* File System Module:
- This module allows us to work with files and directories
- almost all operations called through fs comes as synchronous or asynchronous. We should avoid using synchronous methods. In real world apps we will use asynchronoues methos or non-blocking.
- let´s see an example: in app.js */

const fs = require('fs');

// Sync method
const files = fs.readdirSync('./'); // this will return all the files and folders in the current folder
console.log(files); // [ 'app.js', 'logger.js']

// Async method
const files = fs.readdir('./', function(err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files);
});

/*- all this async methods take a function as their last argument. node will call this function when the async operation completes (callback function)
- a callback is a function with two parameters: an error and a resolve (files)
- only one argument will return so we add an if/else statement

- to test, we comment the const files = fs.readdirSync('./') and the console.log(files) lines*/

console.log(files); // Result [ 'app.js', 'logger.js']

/* Now, let´s simulate an error by changing the './ argument by a dollar sign: fs.readdir('$', ... )

We get:
Error [Error: ENOENT: no such file or directory, scandir 'C:\Users\Marcelo\Docum
ents\Fernando\repositorios-github\node-js\mosh-tutorial\first-app\$'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'scandir',
  path: 'C:\\Users\\Marcelo\\Documents\\Fernando\\repositorios-github\\node-js\\
mosh-tutorial\\first-app\\$'
}

Recap: we always call the module by using require function and then we can use any of the methods defined in that module. */