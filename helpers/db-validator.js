
const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({role});
    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la BD`)
    }
}

const emailExist = async (email = '') => {
    const existEmail = await User.findOne({email});
    if (existEmail) {
        throw new Error(`El email ${email}, ya se encuentra registrado`)
    }
}

module.exports = {
    isValidRole,
    emailExist
}