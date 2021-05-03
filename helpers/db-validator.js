
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

const existUserById = async (id) => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`No existe usuario registrado con el id: ${id}`)
    }
}

module.exports = {
    isValidRole,
    emailExist,
    existUserById
}