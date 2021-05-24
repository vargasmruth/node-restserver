const dbValidator = require('./db-validator');
const googleVerify = require('./google-verify');
const jwtGenerate = require('./jwt-generate');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidator,
    ...googleVerify,
    ...jwtGenerate,
    ...uploadFile
}