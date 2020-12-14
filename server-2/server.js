const express = require('express');
const mysql = require('mysql');
const util = require('util');
const app = express();
const port = 3000;

app.use(express.json());

// Para trabajar con base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coleccion'
});

conexion.connect((error) => {
    if (error) {
        throw error;
    }

    console.log('Conexion con base de datos mysql establecida');
});

// para trabajar con async/await en la conexion mysql
const utilQuery = util.promisify(conexion.query).bind(conexion);

/* ARTISTAS */
// devolver todos los artistas
app.get('/artistas', async (req, res) => {
    try {
        const query = 'SELECT * FROM artistas';

        const respuesta = await utilQuery(query);

        res.send({ "respuesta": respuesta });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// devolver solo un artista
app.get('/artistas/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM artistas WHERE id = ?';

        const respuesta = await utilQuery(query, [req.params.id]);

        res.send({ "respuesta": respuesta });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// agregar un artista
app.post('/artistas', async (req, res) => {
    try {
        if (!req.body.nombre) {
            throw new Error("Debes enviar un nombre!");
        }

        const nombre = req.body.nombre;

        let query = 'SELECT id FROM artistas WHERE id = ?';

        let respuesta = await utilQuery(query, [nombre]);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre ya existe!");
        }

        query = 'INSERT INTO artistas (nombre) VALUE (?)';
        respuesta = await utilQuery(query, [nombre]);

        res.send({ "respuesta": respuesta.insertId });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

// modificar un artista
app.put('/artistas/:id', async (req, res) => {
    try {
        if (!req.body.nombre) {
            throw new Error("Debes enviar un nombre!");
        }

        let query = 'SELECT * FROM artistas WHERE id = ? AND id <> ?';

        let respuesta = await utilQuery(query, [req.body.nombre, req.params.id]);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre ya existe!");
        }

        query = 'UPDATE artistas SET nombre = ? WHERE id = ?';
        respuesta = await utilQuery(query, [req.body.nombre, req.params.id]);

        res.send({ "respuesta": respuesta.affectedRows });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

// borrar un artista
app.delete('/artistas/:id', async (req, res) => {
    try {
        let query = 'SELECT * FROM albums WHERE id = ?';

        let respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length > 0) {
            throw new Error("Aun existen datos asociados. No es posible borrar este artista");
        }

        query = 'DELETE FROM artistas WHERE id = ?';
        respuesta = await utilQuery(query, [req.params.id]);

        res.send({ "respuesta": respuesta.affectedRows });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

/* ALBUMS */
// devolver todos los albums
app.get('/albums', async (req, res) => {
    try {
        const query = 'SELECT * FROM albums';

        const respuesta = await utilQuery(query);

        res.send({ "respuesta": respuesta });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// devolver solo un album
app.get('/albums/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM albums WHERE id = ?';

        const respuesta = await utilQuery(query, [req.params.id]);

        res.send({ "respuesta": respuesta });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});
// agregar un album
app.post('/albums', async (req, res) => {
    try {
        if (!req.body.nombre_album || !req.body.artista_id) {
            throw new Error("No enviaste los datos obligatorios (nombre_album y artista_id)");
        };
        
        let query = 'SELECT * FROM artistas WHERE id = ?';
        let respuesta = await utilQuery(query, [req.body.artista_id]);

        if (respuesta.length == 0) {
            throw new Error("Artista no encotrado");
        };

        query = 'SELECT * FROM albums WHERE nombre_album = ?';
        respuesta = await utilQuery(query, [req.body.nombre_album]);

        if (respuesta.length > 0) {
            throw new Error("Ese album ya existe");
        };

        let descripcion = '';
        if (req.body.descripcion) {
            descripcion = req.body.descripcion;
        };

        query = 'INSERT INTO albums (nombre_album, descripcion, artista_id) VALUES (?, ?, ?)';
        
        respuesta = await utilQuery(query, [req.body.nombre_album, descripcion, req.body.artista_id]);

        res.send({ "respuesta": respuesta.insertId });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

// modificar un album
app.put('/albums/:id', async (req, res) => {
    try {
        if (!req.body.nombre_album) {
            throw new Error("Debes enviar un nombre!");
        }

        let query = 'SELECT * FROM albums WHERE id = ? AND id <> ?';

        let respuesta = await utilQuery(query, [req.body.nombre_album, req.params.id]);

        if (respuesta.length > 0) {
            throw new Error("Ese nombre ya existe!");
        }

        query = 'UPDATE albums SET nombre_album = ? WHERE id = ?';
        respuesta = await utilQuery(query, [req.body.nombre_album, req.params.id]);

        res.send({ "respuesta": respuesta.affectedRows });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});

// borrar un album
app.delete('/albums/:id', async (req, res) => {
    try {
        /* de momento los albums no tienen datos asociados
        let query = 'SELECT * FROM albums WHERE id = ?';

        let respuesta = await utilQuery(query, [req.params.id]);

        if (respuesta.length > 0) {
            throw new Error("Aun existen datos asociados. No es posible borrar este album");
        }
        */
        let query = 'DELETE FROM albums WHERE id = ?';
        let respuesta = await utilQuery(query, [req.params.id]);

        res.send({ "respuesta": respuesta.affectedRows });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "error": e.message })
    }
});


app.listen(port, (req, res) => console.log('listening on port ' + port));