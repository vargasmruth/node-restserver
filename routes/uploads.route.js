
const { Router } = require('express');
const { check } = require('express-validator');

const { validator, validateUpload } = require('../middelwares');
const { upFile, updateImg, getImg } = require('../controllers/uploads.controller');
const { existUserById, availablesCollection } = require('../helpers');

const router = Router();

router.get('/:collection/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('collection').custom(c => availablesCollection(c, ['users', 'products'])),
    validator
], getImg)

router.post('/', validateUpload, upFile);

router.put('/:collection/:id', [
    validateUpload,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('collection').custom(c => availablesCollection(c, ['users', 'products'])),
    validator
], updateImg)

module.exports = router;