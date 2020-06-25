const express = require('express');
const conectarDB = require('./config/db');

//Crear el servidor
const app = express();

//COnectar a la BD
conectarDB();

<<<<<<< HEAD
//Habilitar express.json
app.use(express.json({ extended: true }));

=======
>>>>>>> master
//Puerto de la app
const PORT = process.env.PORT || 4000;

//Definir la pagina principal
//app.get('/', (req, res) => {
//    res.send('Hola Mundo');
//});


//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));

//Arrancar Servidor
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});