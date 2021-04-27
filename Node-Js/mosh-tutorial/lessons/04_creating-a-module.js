/* Creating a module:
- on main module we create logger.js.
- This will be a logging messages module and it will be reused in various parts of this app

- imagine we´ll use those remote login services. They provide login as a service, they give us a URL and we can send an HTTP request to that URL to log messages in the cloud

- on logger.js: */

var url = 'http://mylogger.io/log'; //here we´re gonna sent request

// we also need a function that takes a message and send an HTTP request. For now, this function will only log a message on the console:

function log(message) {
    // Send an HTTP request
    console.log(message);
}

/*- var and log are private, they´re not visible from the outside. However we want to use this logger module on app.js.
- we want to make it visible from the outside.

- Remember the module JSON object. It has the exports property with an empty object.
- anything that we add to this object will be exported from this module and it will be available outside of this module*/

// so, in logger.js we add the log function to the log method:

module.exports.log = log;

// to export the url:
module.exports.url = url;
// we can change the name of the exported variable internally
module.exports.endPoint = url;

/*- but we wont export url. it´s an example.
- in real world apps every module may have several variables and functions. You only want to export the .. of this members to the outside to make it easy to use */