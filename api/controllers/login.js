const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    const verifyPassword = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && verifyPassword)) {
        res.status(401).json({
            error: 'Invalid user or password'
        })
    } else {
        //Crear un token para el usuario 
        const userToken = {
            id: user._id,
            username: user.username
        };

        //Generamos el token y lo firmamos con el token de usuario y el secret guardado como variable de entorno con una expiracion de 7 días
        const token = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 });

        //Si todo OK, mostramos información
        res.status(200).json({
            name: user.name,
            username: user.username,
            token: token
        });
    }
});

module.exports = loginRouter;