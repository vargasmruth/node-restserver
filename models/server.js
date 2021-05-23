
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            users:      '/api/users',
            auth:       '/api/auth',
            categories: '/api/categories'
        }        

        /* Connect to db */
        this.dbConnect();

        /* Middlewares */
        this.middlewares();

        /* Routes */
        this.routes();
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.users, require('../routes/user.route'));
        this.app.use(this.paths.categories, require('../routes/categories.route'));
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
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('Server is running on port', this.port);
        })
    }

}

module.exports = Server;