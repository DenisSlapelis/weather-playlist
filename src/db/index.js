const Sequelize = require('sequelize');
const dbConfig = require('./config');
const UserAuth = require('./models/user-auth.model');
const UserNotes = require('./models/user-notes.model');
const User = require('./models/user.model');

const connection = new Sequelize(dbConfig);

User.init(connection);
UserAuth.init(connection);
UserNotes.init(connection);

User.associate(connection.models);
UserAuth.associate(connection.models);
UserNotes.associate(connection.models);

module.exports = connection;