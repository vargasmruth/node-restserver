const { response, request } = require('express');

const getUsers = (req = request, res = response) => {

    const {q, name = 'No name', apiKey} = req.query;

    res.json({
        msg: 'GET api - controller',
        q,
        name,
        apiKey
    });
};

const postUsers = (req, res = response) => {

    const { name, age } = req.body;

    res.json({
        msg: 'POST api - controller',
        name,
        age
    });
};

const putUsers = (req, res = response) => {

    res.json({
        msg: 'PUT api - controller',
    });
};

const patchUsers = (req, res = response) => {
    res.json({
        msg: 'PATCH api - controller',
    });
};

const DeleteUsers = (req, res = response) => {
    res.json({
        msg: 'DELETE api - controller',
    });
};

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    DeleteUsers
}