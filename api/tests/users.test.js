const { server } = require('../index');
const mongoose = require('mongoose');
//Mongoose Schema
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
//Helpers
const { api } = require('./helpers');



describe('USERS', () => {
    //Antes de hacer un test, introducimos en nuestra base de datos de pruebas unos datos con un hook
    beforeEach(async () => {
        //Primero eliminamos todas los usuarios de prueba que tenemos
        await UserModel.deleteMany({});

        //Guardamos un usuario
        const passwordHash = await bcrypt.hash('password', 10);
        const newUser = UserModel({
            username: 'eneko',
            name: 'Eneko',
            passwordHash: passwordHash
        });

        await newUser.save();
    });

    test('crear un usuario nuevo y comprobar el número de usuarios correcto', async () => {
        //Recuperamos todos los usuarios de la base de datos de forma inicial
        const usersDB = await UserModel.find({});
        const usersInit = usersDB.map(user => user.toJSON());

        //Creamos un nuevo usuario
        const newUser = {
            username: 'janirem',
            name: 'Janire',
            password: 'hack'
        }

        //Insertamos un nuevo usuario
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        //Recuperamos todos los usuarios de la base de datos de forma final tras insertar uno nuevo
        const usersDBUpdate = await UserModel.find({});
        const usersFinal = usersDBUpdate.map(user => user.toJSON());

        expect(usersFinal).toHaveLength(usersInit.length + 1);

    });
});


//Cerrar conexion con el servidor una vez se han ejecutado los tests
afterAll(() => {
    server.close();
    mongoose.connection.close();
});
