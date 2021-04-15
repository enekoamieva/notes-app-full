const testingRouter = require('express').Router();

//Importar el modelo de Notas y Usuario para Mongo
const NoteModel = require('../models/Note.js');
const UserModel = require('../models/User.js');

testingRouter.post('/reset', async (req, res) => {
    await NoteModel.deleteMany({});
    await UserModel.deleteMany({});

    res.status(204).end();
});

module.exports = testingRouter;