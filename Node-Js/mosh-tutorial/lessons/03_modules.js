/* Modules:
- on node there is a problem with this behaviour (global scope): */

var sayHello = function() {}

//window.sayHello();

/*- on real node apps we often display our js code into multiple files. So it´s posible that we have two files and in both of them we declare the same variable.

- when we define in another file the same variable or function, because of its global scope it´s gonna overwrite the previos one.*/


/* Intead, to prevent this, we have MODULARITY:
- we need to create small building blocks (or modules) were we define our variables and functions. We encapsulate them inside a module
- every node app has at least one file which we call 'main module'

- every file in a node app is considered a module and every variable or function declared inside is PRIVATE.
- if you whan to use than variable outside its module you need to explicitly export it and make it public

for example: module object it seems global but it isn´t.*/ 

console.log(module);

// the console will show us a JSON object

