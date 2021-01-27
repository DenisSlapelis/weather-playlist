const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcryptjs");

class UserNotes extends Model {
    static init(sequelize) {
        super.init({
            data: DataTypes.VIRTUAL,
            data_hash: DataTypes.STRING,
        }, {
            hooks: {
                beforeSave: async (userNotes) => {
                    if (userNotes.data) {
                        userNotes.data_hash = await bcrypt.hash(userNotes.data, 8);
                    }
                },
            },
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
}

module.exports = UserNotes;