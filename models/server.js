
const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        /* Middlewares */
        this.middlewares();

        /* Routes */
        this.routes();
    }

    routes(){
        this.app.get('/api', (req, res) => {
            res.send('Hello world');
        })
    }

    middlewares() {
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