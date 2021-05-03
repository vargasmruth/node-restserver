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

    const {name, email, password, role, status} = req.body;
    const user = new User({name, email, password, role, status});

    /* verif email */

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


const putUsers = (req, res = response) => {

    const { name, age } = req.body;

    res.json({
        msg: 'POST api - controller',
        name,
        age
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