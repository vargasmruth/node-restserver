const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio.']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio.']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        required: true
    },
    google: {
        type: Boolean,
        required: false
    }

});

module.exports = model('User', userSchema);
