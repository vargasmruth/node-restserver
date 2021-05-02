
const { Router } = require('express');
const { getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers } = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);

router.post('/', postUsers );

router.post('/', putUsers );

router.post('/', patchUsers );

router.post('/', deleteUsers );

module.exports = router;