
const express = require('express');
const cors = require('cors');

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
            res.json({
                msg: 'GET api',
            });
        });

        this.app.put('/api', (req, res) => {
            res.json({
                msg: 'PUT api',
            });
        });

        this.app.post('/api', (req, res) => {
            res.json({
                msg: 'POST api',
            });
        });
        
        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'DELETE api',
            });
        });
        
        this.app.patch('/api', (req, res) => {
            res.json({
                msg: 'PATCH api',
            });
        });
    }

    middlewares() {
        /* Cors */
        this.app.use(cors());
        
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