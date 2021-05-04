
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validator } = require('../middelwares/validator');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'la contraseña es requerida').not().isEmpty(),
    validator
], login );

module.exports = router;