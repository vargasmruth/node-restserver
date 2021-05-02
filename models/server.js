
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        /* Middlewares */
        this.middlewares();

        /* Routes */
        this.routes();
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user.route'));
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