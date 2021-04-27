/* Extending EventEmitter:
- In the real world is rare that you work with this EventEmitter object directly.
- Instead, you want to create a class that has all the capabilities of the EventEmitter and the you´ll use that class on your code.

So, in logger.js we exported a single function with a message.
- After, we raise an event and later in app module you will listen for that event and do something*/

// logger.js
const EventEmitter = require('events'); // copied from app.js
const emitter = new EventEmitter(); // copied from app.js

var url = 'http://mylogger.io/log';

function log(message) {
    // Send an HTTP request
    console.log(message);

    // Raise an event
    emitter.emit('messageLogged', { id: 1, url: 'http://' }); // copied from app.js
}

module.exports = log;

/* On app.js we require the logger.js and call log function with an argument inside */

const log = require('./logger');
log('message');

/* doing this, the listener won´t function. that´s because here we´re working with two different EventEmitter. Both app.js and logger.js have one 
const emitter = new EventEmitter();

- the listener is only registered with this event emitter. That´s why in your app is rare that you´ll work with the EventEmitter directly. Instead you want to create a class that has all the capabilities of the EventEmitter.

- In this case we´ll create the class logger that has that has the additional method log (from logger.js)*/

class Logger { //class in ES6 is a constructor function
    function log(message) { 
        // Send an HTTP request
        console.log(message);
    
        // Raise an event
        emitter.emit('messageLogged', { id: 1, url: 'http://' });
    }
}

// throws an error because inside a class we dont need the 'function' word. 
class Logger {
    log(message) { 
        // Send an HTTP request
        console.log(message);
    
        // Raise an event
        emitter.emit('messageLogged', { id: 1, url: 'http://' });
    }
}

// At the end, instead of export the log function we export the Logger class
module.exports = Logger;

/* this logger class will have all the capabilities of the EventEmitter. 
- the way we do that is giving the extends keyword of ES6 to the Logger class and the name of the base class*/

class Loger extends EventEmitter {...}

// so inside the class we change emitter by .this
emitter.emit('messageLogged', {});
this.emit('messageLogged', {});

// now we can erase the const emitter because it´s not used anywhere on this code.

/* Now, in app.js:
- When we require the logger module we name a class so we change */
const log = require... 
// for:
const Logger = require...

// After that we have to create the object
const logger = new Logger();
// and then to Logger('message') we change
logger.log('message');

/* finally, here we also don´t need the const emitter because we worlk directly with the logger object.
- we move the listener below this changes and change wmitter.on for logger.on*/

// Now, running this app we´ll see the messageand the event message


/* Recap: to raise events in your app
- signal that something has happened
- create a class that extends EventEmitter
- this class will have all the funcionality to find an EventEmitter but you can also add additional funcionality like the log(message)
- then, inside that class, whenever you want to raise an event you´re gonna use this.emit (that references the Loger class itself which extends EventEmitter)
- finally, in app.js, instead of using an instance of EventEmitter you will use an instance of the custom class that you have defined that extends EventEmitter */