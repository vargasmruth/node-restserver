
const { Router, response } = require('express');
const { check } = require('express-validator');
const { existProductById, existCategoryById } = require('../helpers/db-validator')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { validateJwt, validator, isAdminRole } = require('../middelwares');

const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existProductById),
    validator,
], getProduct);

router.post('/', [ 
    validateJwt,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('category', 'No es un id de mongo valido').isMongoId(),
    check('category').custom(existCategoryById),
    validator
], createProduct )

router.put('/:id', [
    validateJwt,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existProductById),
    validator
], updateProduct)

router.delete('/:id', [
    validateJwt,
    isAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existProductById),
    validator
], deleteProduct)

module.exports = router;