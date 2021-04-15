const notesRouter = require('express').Router();

//Importar el modelo de Notas y Usuario para Mongo
const NoteModel = require('../models/Note.js');
const UserModel = require('../models/User.js');

//Middlewares
const userExtractor = require('../middleware/userExtractor');

notesRouter.get('/', (req, res) => {
    NoteModel.find().populate('user', { name: 1, username: 1 })
        .then(note => {
            res.json(note);
        })
});

notesRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;

    //Comprobación de la nota a consultar
    NoteModel.findById(id).populate('user', { name: 1, username: 1 })
        .then(note => {
            if (note) {
                return res.json(note);
            } else {
                return res.status(404).end('No se ha encontrado la nota');
            }
        })
        .catch(err => next(err));
});

notesRouter.delete('/:id', userExtractor, (req, res, next) => {
    const id = req.params.id;

    NoteModel.findByIdAndRemove(id)
        .then(note => {
            if (note) {
                return res.status(204).json({
                    note: 'Nota eliminada'
                });
            } else {
                return res.status(404).end('No se ha encontrado la nota');
            }

        })
        .catch(err => next(err));
});

notesRouter.put('/:id', (req, res, next) => {
    const note = req.body.updateNote;
    const id = req.params.id;

    /*     if (!note || !note.title || !note.content) {
            return res.status(400).json({
                error: 'note.title or note.content is missing'
            });
        } */

    const updateNote = {
        note,
        important: note.important
    }

    NoteModel.findByIdAndUpdate(id, updateNote, { new: true })
        .then(result => {
            return res.end('Nota actualizada');
        })
        .catch(err => next(err));
});

notesRouter.post('/', userExtractor, (req, res) => {
    const note = req.body;

    //Obtener la ultima ID de un post
    //const ids = notes.map(note => note.id);
    //const maxId = Math.max(...ids);

    if (!note || !note.title) {
        return res.status(400).json({
            error: 'note.title is missing'
        });
    }

    //Recuperamos del middleware USEREXTRACTOR el userID que ha guardado en la req
    userId = req.userId;

    //Obtenemos el usuario que ha guardado la nota
    UserModel.findById(userId)
        .then(user => {
            //Obtenemos los datos que llegan al servidor y los guardamos creando una instancia del modelo
            const newNote = new NoteModel({
                title: note.title,
                content: note.content,
                date: new Date(),
                important: note.important || false,
                user: user._id
            });

            //Añadir el nuevo Post all array de posts del usuario
            user.notes.push(newNote._id);

            user.save()
                .then(() => {
                    //Guardamos la información en MongoDB
                    newNote.save().then(savedNote => {
                        res.json(savedNote);
                    });
                })
        })

});


module.exports = notesRouter;