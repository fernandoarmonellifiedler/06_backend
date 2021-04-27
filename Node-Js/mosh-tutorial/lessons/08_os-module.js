/* OS module: 
- how to get information of the current operating system?
- we call the require function and store the results on a const variable. The, we can call some os methods*/

const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total Memory: ' + totalMemory);
console.log(`Free Memory of ${freeMemory}`);

/* We get this information:
console.log('Total Memory: ' + totalMemory);
console.log(`Total Free Memory of ${freeMemory}`); - Before Node, Javascript will never get this information. It only runned on browsers with DOM*/