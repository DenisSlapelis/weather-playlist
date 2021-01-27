const { Model, DataTypes } = require('sequelize');

class RequestLog extends Model {
    static init(sequelize) {
        super.init({
            method: DataTypes.STRING,
            path: DataTypes.STRING,
            has_authorization_header: DataTypes.BOOLEAN,
            user_id: DataTypes.INTEGER,
            body: DataTypes.STRING,
            params: DataTypes.STRING,
            query: DataTypes.STRING,
            user_agent: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'request_logs',
        })
    }

    static associate(models) {
    }
}

module.exports = RequestLog;