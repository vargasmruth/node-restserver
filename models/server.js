
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            users:      '/api/users',
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:     '/api/uploads',
        }        

        /* Connect to db */
        this.dbConnect();

        /* Middlewares */
        this.middlewares();

        /* Routes */
        this.routes();
    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        /* Cors */
        this.app.use(cors());

        // body
        this.app.use(express.json());
        
        /* public directory */
        this.app.use(express.static('public'));

        /* file uploads */
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.users, require('../routes/user.route'));
        this.app.use(this.paths.categories, require('../routes/categories.route'));
        this.app.use(this.paths.products, require('../routes/products.route'));
        this.app.use(this.paths.search, require('../routes/search.route'));
        this.app.use(this.paths.uploads, require('../routes/uploads.route'));
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('Server is running on port', this.port);
        })
    }

}

module.exports = Server;