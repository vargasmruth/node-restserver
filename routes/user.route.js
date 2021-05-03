
const { Router } = require('express');
const { check } = require('express-validator');
const { isValidRole, emailExist } = require('../helpers/db-validator');
const { getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers } = require('../controllers/user.controller');

const { validator } = require('../middelwares/validator');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La contraseña es requerido, debe ser de mas de 8 caracteres')
    .not().isEmpty().isLength({min: 8}),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExist),
    /* check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), */
    check('role', 'No es un rol permitido').custom(isValidRole),
    validator
], postUsers );

router.put('/', putUsers );

router.patch('/', patchUsers );

router.delete('/', deleteUsers );

module.exports = router;