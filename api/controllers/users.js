const usersRouter = require('express').Router();
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

//Obtener todos los usuarios con sus notas
usersRouter.get('/', (req, res, next) => {
    UserModel.find().populate('notes', { content: 1, title: 1, important: 1, date: 1 })
        .then(users => res.json(users))
        .catch(err => next(err));
});

//Obtener un usuario por ID con sus notas
usersRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;

    UserModel.findById(id).populate('notes', { content: 1, title: 1, important: 1, date: 1 })
        .then(user => {
            if (user) {
                return res.json(user);
            } else {
                return res.status(404).send('Usuario no encontrado');
            }
        })
        .catch(err => next(err));
});

usersRouter.post('/', (req, res, next) => {
    const user = req.body;

    if (!user.username || !user.name) {
        return res.status(404).end('username or name is missing');
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {

            const newUser = new UserModel({
                username: user.username,
                name: user.name,
                passwordHash: hash
            });

            newUser.save()
                .then(user => res.status(201).json(user))
                .catch(err => next(err));
        });
    });



});

module.exports = usersRouter;