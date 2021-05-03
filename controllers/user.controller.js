const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = (req = request, res = response) => {

    const {q, name = 'No name', apiKey} = req.query;

    res.json({
        msg: 'GET api - controller',
        q,
        name,
        apiKey
    });
};

const postUsers = async (req, res = response) => {    

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    /* Encrypt pass */
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    /* save to db */
    await user.save();

    res.json({
        msg: 'POST api - controller',
        user
    });
};

const putUsers = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if (password) {
        /* Encrypt pass */
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );        
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT api - controller',
        user
    });
};

const patchUsers = (req, res = response) => {
    res.json({
        msg: 'PATCH api - controller',
    });
};

const deleteUsers = (req, res = response) => {
    res.json({
        msg: 'DELETE api - controller',
    });
};

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}