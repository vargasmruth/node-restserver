
const validator   = require('../middelwares/validator');
const validateJwt = require('../middelwares/validate-jwt');
const isAdminRole = require('../middelwares/validate-role');
const hasRole     = require('../middelwares/validate-role');
const validateFileUpload = require('../middelwares/validate-file');

module.exports = {
    ...validator,
    ...validateJwt,
    ...isAdminRole,
    ...hasRole,
    ...validateFileUpload
}

