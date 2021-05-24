const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models')

const permitCollections = [
    'users',
    'products',
    'categories',
    'roles'
];

const searchUsers = async(term = '', res = response) => {
    
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);
        res.json({
            results: user ? [user] : []
        })
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({ /* User.count for results quantity */
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    });

    res.json({
        results: users
    })

}

const searchProducts = async(term = '', res = response) => {
    
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const product = await Product.findById(term).populate('category', 'name');
        res.json({
            results: product ? [product] : []
        })
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({name: regex, status: true}).populate('category', 'name');

    res.json({
        results: products
    })

}

const searchCategories = async(term = '', res = response) => {
    
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const category = await Category.findById(term);
        res.json({
            results: category ? [category] : []
        })
    }

    const regex = new RegExp(term, 'i');

    const categories = await Category.find({name: regex, status: true});

    res.json({
        results: categories
    })

}


const search = async(req, res = response) => {

    const { collection, term } = req.params;

    if (!permitCollections.includes(collection)) {
        return res.status(400).json({
            msg: `La collecion ${collection}, no existe`
        });
    }

    switch (collection) {
        case 'users':
            await searchUsers(term, res);
            break;
        case 'products':            
            await searchProducts(term, res);
            break;
        case 'categories':
            await searchCategories(term, res);
            break;
    
        default:
            res.status(400).json({
                msg: `Se me olvido hacer esta busqueda`
            })
    }

    res.json({
        collection, term
    })
}

module.exports = {
    search
}