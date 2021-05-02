
const { Router } = require('express');
const { getUsers, postUsers, putUsers, patchUsers, DeleteUsers } = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);

router.post('/', postUsers );

router.post('/', putUsers );

router.post('/', patchUsers );

router.post('/', DeleteUsers );

module.exports = router;