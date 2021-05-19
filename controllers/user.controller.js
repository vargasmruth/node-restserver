const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {

    const {limit = 5, from=0} = req.query;
    const query = {status: true};

    const [fullCount, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({fullCount, users});
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

    res.json({user});
};

const patchUsers = (req, res = response) => {
    res.json({
        msg: 'PATCH api - controller',
    });
};

const deleteUsers =async (req, res = response) => {
    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {status: false});
    res.json(user);
};

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}