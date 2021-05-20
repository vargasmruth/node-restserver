
const {response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { jwtGenerate } = require('../helpers/jwt-generate');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        /* Verif email */
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - email'
            })
        }

        /* verif active user */
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - estado: false'
            })
        }

        /* verif pass */
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - password'
            })
        }

        /* JWT generate */
        const token = await jwtGenerate(user.id);

        res.json({
            user, token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contactese con el administrador'
        })
    }    
}

const googleSignIn = async(req, res = response) => {

    const {id_token} = req.body;
    
    try {
        // const googleUser = await googleVerify( id_token );
        const {name, img, email} = await googleVerify( id_token );

        let user = await User.findOne({email});
        if (!user) {
            const data = {
                name,
                email,
                password: '***',
                img,
                google: true
            }
            user = new User(data);
            await user.save();
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Usuario no habilitado, contactese con el administrador del sistema.'
            })
        }

        const token = await jwtGenerate(user.id);
        
        res.json({
            user, token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google, no es válido'
        })
    }
    
}

module.exports = {
    login,
    googleSignIn
}