/* Events Module:
- Event is one of the core concepts in node. Basically is a signal that something has happened 
- In node several classes raises different kinds of events. I/e:
    *An HTTP class receives a request and produces an Event:New Request
- Events Module helps us to work with events and to respond to them. 
- So in the Event module we have the Class:EventEmitter. Is one of the core building blocks of node.
So, in app.js: */

const EventEmitter = require('events'); //note the uppercase when naming classes
// A class is a container for properties, functions (which we call methods). 

// In order to this EventEmitter to function first we need to create an Instance of this class. So:
const emitter = new EventEmitter();
// this is an object. The one we´re gonna use in our app

/* The emitter has many methods. Most of the time we use two of them:
1_ .emit('event-name'): raises an event. Signals that an event has happened  */
emitter.emit('messageLogged');

/*- run this app and nothing will happen becauce we haven´t registered a listener interesed in that event.
- A listener is a function that will be called when that event is raised. First argument is the name of the event, the second one is a callback function */

emitter.on('messageLogged', function() {
    console.log('Listener called');
});




/* Example of the difference between class and object:
- Let´s say that a class is Human and an object is John.
- Class defines properties and behaviour concept of a human
- an Object is an actual instance of that class */