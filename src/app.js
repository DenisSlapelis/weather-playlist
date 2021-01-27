require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});
require('./db');
const middlewares = require('./routes/middleware');

const express = require("express");

class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(middlewares.saveRequestLog);
        this.express.use(middlewares.checkAuthToken);
    }

    routes() {
        this.express.use(require("./routes"));
    }
}

module.exports = new AppController().express;