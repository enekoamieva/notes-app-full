const jwt = require('jsonwebtoken');

const userStractor = (req, res, next) => {
    //Recuperar JWT en la cabezera HTTP y comprobamos que se esta utilizando el metodo BEARER
    const authorization = req.get('authorization');
    let token = '';
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        //console.log(authorization);
        token = authorization.substring(7);
    }

    //Decodificamos el token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    //console.log(decodeToken);

    //Comprobamos que la info es correcta
    if (!token || !decodeToken.id) {
        return res.status(401).json({
            error: 'El token es incorrecto o está vacío'
        })
    }

    //Recuperamos el ID del usuario que va en el token
    const tokenUserId = decodeToken.id;

    //Dejamos en la request el userID
    req.userId = tokenUserId;

    //El contenido se ejecutara despues de este middleware
    next();
}

module.exports = userStractor;