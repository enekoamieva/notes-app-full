//Para tomar  las variables de entorno creadas en el fichero .env
require('dotenv').config();

const express = require('express');

//Importamos la conexión al servidor de MongoDB
require('./mongo.js');

//Permitr el acceso a los datos de peticiones externas
const cors = require('cors');
//Inicializar servidor
const app = express();
//Cualquier origen va a funcionar en nuestra API
app.use(cors())
//Permitir el uso de Json al servidor
app.use(express.json());
//Ruta para poder servir estáticos en nuestro servidor
//app.use('/images', express.static('images'));

//Importar controladores
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');


//Servir la carpeta BUILD de nuestro proyecto frontend
app.use(express.static('../app/build'));


//Controlador con las rutas de las notas
app.use('/api/notes', notesRouter);

//Controlador con las rutas de usuario
app.use('/api/users', usersRouter);

//Controlador con las rutas de login
app.use('/api/login', loginRouter);


//Controlador para las rutas de testing solo accesible en entornos de desarrollo
if (process.env.NODE_ENV === 'test') {
    //Controlador para testing
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}


//Middleware para capturar los errores. All poner como primer parametro ERROR un CATCH con error buscará este middleware
app.use((error, req, res, next) => {
    console.error(error);
    //console.log(error.name);
    if (error.name === 'CastError') {
        return res.status(400).end('Petición incorrecta!! La id usada no está bien');
    } else if (error.name === 'ValidationError') {
        return res.status(409).send({
            error: 'El valor ya existe y debe de ser único'
        });
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'El token es incorrecto'
        })
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'El token ha expirado. Debes de iniciar sesión'
        })
    } else {
        return res.status(500).end();
    }
});

//Error 404
app.use((req, res) => {
    res.status(404).json({
        error: 'Error 404 ¡No encontrado!'
    });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Exportar APP
module.exports = { app, server };