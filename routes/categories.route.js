
const { Router, response } = require('express');
const { check } = require('express-validator');
const { existCategoryById } = require('../helpers/db-validator')
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');
const { validateJwt, validator, isAdminRole } = require('../middelwares');

const router = Router();

/* Obtener todas las categorias */
router.get('/', getCategories);

/* Obtener una categoria */
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existCategoryById),
    validator,
], getCategory)

/* Crear categoria - privado - cualquier persona con token valido */
router.post('/', [ 
    validateJwt,
    check('name', 'El nombre es requerido').not().isEmpty(),
    validator
], createCategory )

/* Actualizar categoria - privado - cualquier persona con token valido */
router.put('/:id', [
    validateJwt,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existCategoryById),
    check('name', 'El nombre es requerido').not().isEmpty(),
    validator
], updateCategory)

/* Borar categoria -admin */
router.delete('/:id', [
    validateJwt,
    isAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    validator,
    check('id').custom(existCategoryById),
    validator
], deleteCategory)


module.exports = router;