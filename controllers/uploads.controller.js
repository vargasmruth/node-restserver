
const path = require('path');
const fs = require('fs');
const { response, request } = require("express");

const { uploadFile } = require('../helpers')

const { User, Product } = require('../models')

const getImg = async(req, res = response) => {

    const {id, collection} = req.params;
    
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${ id }`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id: ${ id }`
                });
            }
            break;
    
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
    }

    // clean previus image
    if (model.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }

    const pathImage = path.join(__dirname, '../assets/img/no-image.jpg');
    res.sendFile(pathImage);
}

const upFile = async(req = request, res = response) => {

    console.log(req.files);

    try {
        /* const fileName = await uploadFile(req.files, ['txt', 'yml'], 'textos'); */
        const fileName = await uploadFile(req.files, undefined, 'imgs');
        res.json({
            fileName
        })    
    } catch (error) {
        res.status(400).json(error);
    }    
}

const updateImg = async(req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${ id }`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id: ${ id }`
                });
            }
            break;
    
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
    }

    // clean previus image
    if (model.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    const fileName = await uploadFile(req.files, undefined, collection);
    model.img = fileName;

    await model.save();

    res.json({ model })

}

module.exports = {
    upFile,
    updateImg,
    getImg
}