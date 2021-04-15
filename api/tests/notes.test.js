const { server } = require('../index');
const mongoose = require('mongoose');
//Mongoose Schema
const NoteModel = require('../models/Note');

//Helpers
const { notasIniciales, api } = require('./helpers');



//Antes de hacer un test, introducimos en nuestra base de datos de pruebas unos datos con un hook
beforeEach(async () => {
    //Primero eliminamos todas las notas de prueba que tenemos
    await NoteModel.deleteMany({});

    //Por cada nota guardada en las notasIniciales, hacemos un forof para que secuencialmente se añadan a la base de datos a traves del modelo
    for (const note of notasIniciales) {
        const objectNote = new NoteModel(note);
        await objectNote.save();
    }
});

describe('GET', () => {
    //Comprobar que el servidor devuelve un Json
    test('notas son devueltas en json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    //Comprobar que en la BD hay el mismo número de notas que las previamente declaradas
    test('dos notas en BD', async () => {
        const response = await api.get('/api/notes');
        expect(response.body).toHaveLength(notasIniciales.length);
    });

    //Comprobar que en una de las notas tenemos la misma descripción
    test('es la misma descripción que en una de las notas', async () => {
        const response = await api.get('/api/notes');
        const contents = response.body.map(content => content.content);

        expect(contents).toContain('Esto es una nota');
    });
});

describe('POST', () => {
    //Añadir una nueva nota
    test('añadir una nueva nota', async () => {
        const newNote = {
            content: 'Esto es una nota nueva',
            title: 'Esto es el título de una nueva nota',
            important: false
        };

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/notes');
        const contents = response.body.map(content => content.content);
        expect(contents).toContain(newNote.content);
    });

    //Añadir una nueva nota
    test('añadir una nueva nota sin contenido no es añadida', async () => {
        const newNote = {
            important: false
        };

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
            .expect('Content-Type', /application\/json/);

    });
});

describe('DELETE', () => {
    //Eliminar una nota que no existe
    test('intentar eliminar una nota que no existe', async () => {

        await api.delete('/api/notes/12345678')
            .expect(400)

        //Volvemos a recuperar todas las notas para comprobar que ya no existe en nuestra BD esa nota
        const responseAfterDelete = await api.get('/api/notes');
        expect(responseAfterDelete.body.length).toEqual(notasIniciales.length);

    });

    //Eliminar una nota
    test('eliminar una nota', async () => {
        //Obtener todas las notas de la BD, guardar la primera para obtener la ID
        const response = await api.get('/api/notes');
        const noteToDelete = response.body[0];

        await api.delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        //Volvemos a recuperar todas las notas para comprobar que ya no existe en nuestra BD esa nota
        const responseAfterDelete = await api.get('/api/notes');
        expect(responseAfterDelete.body.length).toEqual(notasIniciales.length - 1);

    });
});


//Cerrar conexion con el servidor una vez se han ejecutado los tests
afterAll(() => {
    server.close();
    mongoose.connection.close();
});
