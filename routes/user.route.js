
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers } = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('email', 'El email no es válido').isEmail(),
], postUsers );

router.put('/', putUsers );

router.patch('/', patchUsers );

router.delete('/', deleteUsers );

module.exports = router;