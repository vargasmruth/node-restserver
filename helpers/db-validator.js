const {User, Category, Role, Product} = require('../models');

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

const existProductById = async (id) => {
    const exist = await Product.findById(id);
    if (!exist) {
        throw new Error(`No existe una producto registrada con el id: ${id}`)
    }
}

const availablesCollection = ( collection = '', collections = [] ) => {
    const include = collections.includes(collection)
    if (!include) {
        throw new Error(`La colecion ${collection}, no es permitida, las permitidas son: ${collections}`)
    }
    return true;
}

module.exports = {
    isValidRole,
    emailExist,
    existUserById,
    existCategoryById,
    existProductById,
    availablesCollection
}