
const { Router } = require('express');
const { check } = require('express-validator');

const { validator } = require('../middelwares/validator');
const { upFile } = require('../controllers/uploads.controller');

const router = Router();

router.post('/', upFile);


module.exports = router;