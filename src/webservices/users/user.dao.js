const sequelize = require('../../db');
const CustomError = require('../../shared/custom-error');
const User = require('../../db/models/user.model');
const UserAuth = require('../../db/models/user-auth.model');
const UserNotes = require('../../db/models/user-notes.model');

class UserDAO {
    constructor() {
    }

    getUserByEmail = async (email) => {
        return UserAuth.findOne({ where: { email }, include: [User] }).catch(err => {
            throw new CustomError(err.message, 'Sequelize MySQL Error');
        });
    }

    createUser = async ({ name, email, password, personalNotes, hometown }) => {
        const t = await sequelize.transaction();

        try {
            const result = await User.create({
                name,
                hometown,
                UserAuth: {
                    email,
                    password
                }
            }, {
                include: [
                    UserAuth,
                ],
                transaction: t
            }).catch(err => {
                throw new CustomError(err.message, 'Sequelize MySQL Error');
            });

            const userId = result.dataValues.id;

            await this.addUserNotes(t, userId, personalNotes);

            await t.commit();
        }
        catch (err) {
            await t.rollback();
            throw new CustomError(err.message, 'Sequelize MySQL Error');
        }
    }

    addUserNotes = async (transaction, userId, personalNotes) => {
        for (const [idx, note] of personalNotes.entries()) {
            await UserNotes.create({
                user_id: userId,
                data: note
            }, {
                transaction
            }).catch(err => {
                throw new CustomError(err.message, 'Sequelize MySQL Error');
            });
        }
    }

    updateRecoveryPasswordToken = async (email, newPasswordToken) => {
        UserAuth.update({
            password_recovery_token: newPasswordToken
        }, {
            where: { email },
        }).then(function (rowsUpdated) {
            console.log('rowsUpdated: ', rowsUpdated);
        }).catch(err => {
            throw new CustomError(err.message, 'Sequelize MySQL Error');
        });
    }

    resetUserPassword = async (email, newPassword, recoveryToken) => {
        UserAuth.update({
            password_hash: newPassword,
            password_recovery_token: null
        }, {
            where: { email, password_recovery_token: recoveryToken },
        }).then(function (rowsUpdated) {
            console.log('rowsUpdated: ', rowsUpdated);
        }).catch(err => {
            throw new CustomError(err.message, 'Sequelize MySQL Error');
        });
    }
}

module.exports = new UserDAO();