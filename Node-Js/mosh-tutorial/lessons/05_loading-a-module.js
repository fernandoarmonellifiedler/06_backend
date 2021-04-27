/* Loading a module:
- To load a module we use the require() function:
- it takes only one argument: the name, path or target module that we want to look. So, in app.js: */

require('./logger.js'); // or
require('./logger');

//- the require function returns the object that is exported from this target module. i.e: in app.js

var logger = require('./logger');

console.log(logger); //the console shows the log function. So we can call the log function and pass a message from app.js

logger.log('message'); //and the console shows ''message

//- in recents version of node we can define constants so, as best practice, we define a require function with const:

const logger = require('./logger');


//- To avoid errors we can use jshint tool: on console we write: jshint app.js and we get detailed info of the error


// Sometimes instead of exporting an object from a module you want to export only a single function. In this case, exporting an object is necessary when you have multiple properties or data. So we can change in logger.js

module.exports.log = log; // this
module.exports = log; // by this

// on app.js, const logger is not longer an object, it´s a function that we can call directly

logger.log('message'); // instead of this
logger('message'); // we can use this

// a better name for this function will be 'log' so we change it