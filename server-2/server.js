const express = require('express');
const app = express();
const util = require('util');
app.use(express.json);

const port = 3000;

// Para trabajar con base de datos
const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coleccion'
});

conexion.connect(error => {
    if (error) {
        throw error;
    }
    console.log('Conexion con base de datos mysql establecida');
});

// para trabajar con async/await en la conexion mysql
const utilQuery = util.promisify(conexion.query).bind(conexion);

// Metodos
app.get('/artistas', async (req, res) => {
    try {
        const query = 'SELECT * FROM artistas';

        const respuesta = await utilQuery(query);
        console.log({"respuesta": respuesta});
        res.send({"respuesta": respuesta});
    }
    catch(e) {
        console.error(e.message);
        res.status(413).send({"error": e.message})
    }
});


app.listen(port, (req, res) => console.log('listening on port ' + port));