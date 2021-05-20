
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validator } = require('../middelwares/validator');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'la contraseña es requerida').not().isEmpty(),
    validator
], login );

router.post('/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validator
], googleSignIn );

module.exports = router;