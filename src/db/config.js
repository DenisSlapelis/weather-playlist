const environment = require('../environment/environment');

module.exports = {
    dialect: 'mysql',
    host: environment.mySqlHost,
    username: environment.mySqlUser,
    password: environment.mySqlPassword,
    database: environment.mySqlDB,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    },
};