const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

const validateJwt = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const user = await User.findById(uid);
        /* Verif is user exist */
        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            });
        }

        /* verif uid is status=true */
        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no valido - usuario eliminado'
            });
        }
        
        req.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
    next();
}

module.exports = {
    validateJwt
}