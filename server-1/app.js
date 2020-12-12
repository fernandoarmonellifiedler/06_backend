const express = require('express');
const app = express();
app.use(express.urlencoded()); // para recibir formularios
app.use('/static', express.static('public')); // para archivos estáticos

const port = 3000;

// path de saludos
app.get('/static/greetings', (req, res) => {
    res.send('Hola! (con GET)');
});

app.post('/static/greetings', (req, res) => {
    res.send('Hola! (con POST)');
});

app.put('/static/greetings', (req, res) => {
    res.send('Hola! (con PUT)');
});


// path del formulario
app.post('/form', function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    let mobile = req.body.mobile;
    let countryBirth = req.body.countryBirth;
    let countryResidence = req.body.countryResidence;

    let html = `
        <!DOCTYPE html>
        <html lang="es">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Trabajo Práctico</title>
        </head>

        <body>
            <p>Hola ${firstName} ${lastName}.</p>
            <p>Hemos recibido tus datos!</p>
            <p>Nombre y apellido/s: ${firstName} ${lastName}</p>
            <p>Edad: ${age} años</p>
            <p>Celular: ${mobile}</p>
            <p>Pais de nascimiento: ${countryBirth}</p>
            <p>Pais de residencia: ${countryResidence}</p>
            <br />
            <a href="http://localhost:3000/">Ingresar otro registro</a>
        </body>
        </html>
        `;

    res.send(html);
})



app.listen(port, () => console.log('Escuchando en el puerto ' + port));