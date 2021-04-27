/* HTTP Module:
- In Node, the HTTP module that we use to create networking applications. For example, a web server that listens for http request. We can create a back-end server for our client appliction.
- Back to our app.js we create the require*/

const http = require('http');

// then we call...

const server = http.createServer();

//...and in this server we can create a web server.

/*- This server is an EventEmitter so it has all the capabilities of the EventEmitter that we saw before (.on, .emit, .add)
- On our server object we can call .listen with a port */

server.listen('3000');

/*- This server raises an event so we can use the .on method to handle that event. So, before listening we want to raise a listener. */

server.on('connection');

/*- first argument is the name 'connection' and the second is a callback function for the actual listener.
- the listener is a function with one argument: socket with the socket class and that return void*/

server.on('connection', (socket) => {
    console.log('New connection...');
});

// with console.log you can see the results on console

/*- This server object raises different kinds of events that it can respond to.
- In real world apps you´re not gonna respond to the connection event so we´ll delete the server.on..
- Instead, we´re gonna pass a callback function to the createServer method that has two parameters: request and response*/

const server = http.createServer((req, res) => {

});

/*- This function is gonna work with an actual request or response object (instead of a socket).
- We can check if req.url equals '/' and sent something to the client. We write Hello World and end response*/

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }
});

// This will write Hello World on the localhost:3000 server.

/*- If you want to build a back-end service for our web or mobile apps we need to handle various routes here. For example, to return an array of objects using json, JSON.stringify() and giving an array of objects.*/

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

/*- As you see, building a web server using Node is very easy but in the real world we´re not gonna use this HTTP module to build a back-end service for an application.
- The reason is because as you add more routes this code gets more complex.
- Instead we use a framework called Express which giver our application a clean structure to handle various routes */