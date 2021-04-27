/* Event Arguments:
- Often, when you raise an event you also want to send some data about that event (user id, an url, etc)
- So in the emitter we can add additional arguments which we´ll refer as event arguments. */

// Raise an event
emitter.emit('messageLogged', 1, 'url'); //id=1 and an url

// Important: when you pass many values as event arguments is best practice to encapsulate them on an object. so:
emitter.emit('messageLogged', { id:1 , url: 'http://'});

/*- Now, the listener function receives this event argument so we add arg as a parameter to that function (or 'e' or 'eventArg')*/

emitter.on('messageLogged', function(arg) {
    console.log('Listener called', arg);
});

/* In EcmaScript 2015 or ES6 we have arrow functions: */
emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});


/* A simple exercise: 
- Imagine in our logger module just before calling a remote service to log the message. We´re going to raise an event called logging.
- With this event we want to send some data, the message that we want to log */

const emitter2 = new EventEmitter();

// Raise: logging (data: message)
emitter2.on('loggingData', (arg) => {
    console.log('Message', arg)
})

emitter2.emit('loggingData', { id: 'user1', data: 'message'});