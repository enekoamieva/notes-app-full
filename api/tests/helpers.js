const supertest = require('supertest');
const { app } = require('../index');
const api = supertest(app);

const notasIniciales = [
    {
        content: 'Esto es una nota',
        title: 'Esto es el título de una nota',
        important: true,
        date: new Date()
    },
    {
        content: 'Esto es la nota número 2',
        title: 'Esto es el título de la nota 2',
        important: false,
        date: new Date()
    },
    {
        content: 'Esto es la nota número 3',
        title: 'Esto es el título de la nota 3',
        important: true,
        date: new Date()
    },
]

module.exports = {
    notasIniciales,
    api
}