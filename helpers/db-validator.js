const {User, Category, Role} = require('../models');

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

const existCategoryById = async (id) => {
    const existCategory = await Category.findById(id);
    if (!existCategory) {
        throw new Error(`No existe una categoria registrada con el id: ${id}`)
    }
}

module.exports = {
    isValidRole,
    emailExist,
    existUserById,
    existCategoryById
}