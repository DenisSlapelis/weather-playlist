const { Model, DataTypes } = require('sequelize');

class User extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING,
			hometown: DataTypes.STRING,
		}, {
			sequelize
		})
	}

	static associate(models) {
		this.hasOne(models.UserAuth, { foreignKey: 'user_id' });
		this.hasMany(models.UserNotes, { foreignKey: 'user_id' });
	}
}

module.exports = User;