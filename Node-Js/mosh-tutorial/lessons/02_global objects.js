/* Global Objects:
- console.log() is a global object - can be accesed anywhere */
console.log();

// it belongs to the window global object, where it was defined
window.console.log()

// all this methods are global too
setTimeout(); // window.setTimeout()
clearTimeout();

setInterval();
clearInterval();

// also, variables declared with var are global
var message = ''; // window message

// Node doesn´t have this window object. Instead it has global object:
global.setTimeout();
global.console.log();

// in node, the variables and functions defined here are not global. 
console.log(global.message); // throws undefined.

// it scope is this file.js. That´s because of the modules