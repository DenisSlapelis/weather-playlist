const dotenv = require('dotenv');
dotenv.config();

class Environment {
    constructor() {
        // PROJECT CONF VARS
        this.host = process.env.HOST || '0.0.0.0';
        this.port = process.env.PORT || 4000;
        this.showStack = process.env.SHOW_STACK || "false";

        // DATABASE (MYSQL) CONF VARS
        this.mySqlHost = process.env.MYSQL_HOST || 'localhost';
        this.mySqlUser = process.env.MYSQL_USER || 'root';
        this.mySqlPassword = process.env.MYSQL_PASS || 'root';
        this.mySqlDB = process.env.MYSQL_DB || 'weather_playlist_db';
    }

}

module.exports = new Environment();