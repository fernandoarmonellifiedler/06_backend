/* Module Wrapper Funtion:
- We´ve seen that variables and functions declared inside a module are private. So how node does this?- create a sintactical error on logger.js on the very first line */
var x =;

// the message shows a function with different arguments like this:
(function (exports, require, module, __filename, __dirname) { })

/*- what happens is that node doesn´t execute the file code. It wrappes it inside a function
- so, on runtime, our code in logger will be converted in something like this:*/
(function (exports, require, module, __filename, __dirname) {

    var url = 'http://mylogger.io/log';

    function log(message) {
            // Send an HTTP request
            console.log(message);
        }

    module.exports = log;

})

/* This is what we call Module Wrapper Funtion:
- as you can see, the require function appears global but it isn´t. It´s local to each module
- it has module, exports (which is the shortcut of module.exports). So if you want to add a function to module that exports objects:*/
module.exports.log = log; // you can do this
exports.log = log; // or this

/*- the Module Wrapper Funtion also has two more arguments:__filename and __dirname
- on logger.js we write: */
console.log(__filename);
console.log(__dirname);