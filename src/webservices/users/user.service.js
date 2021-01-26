const CustomError = require('../../shared/custom-error');
const userUtils = require('./user.utils');
const userDAO = require('./user.dao');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class UserService {
    constructor() {
    }

    createUser = async ({ name, email, password, personalNotes, hometown }) => {
        await userUtils.userValidation({ name, email, password, personalNotes, hometown });
        await userDAO.createUser({ name, email, password, personalNotes, hometown });
    }

    doLogin = async (email, password) => {
        await userUtils.loginValidation(email, password);

        const user = await userDAO.getUserByEmail(email);

        if (!user)
            throw new CustomError('Invalid user or password', 'Validation Error');

        const userData = user.dataValues;

        if (!await this.isValidatCredentials(userData, password))
            throw new CustomError('Invalid user or password', 'Validation Error');

        return userUtils.formatLoginResponse(userData);
    }

    isValidatCredentials = async (user, password) => {
        const passwordHash = user.password_hash;
        return bcrypt.compare(password, passwordHash);
    }

    forgotPassword = async (email) => {
        userUtils.emailValidation(email);

        const recoveryToken = crypto.randomBytes(20).toString('hex');
        console.log('== recoveryToken: ', recoveryToken);

        await userDAO.updateRecoveryPasswordToken(email, recoveryToken);

        this.sendRecoveryTokenEmail(email, recoveryToken);
    }

    sendRecoveryTokenEmail = async (email, recoveryToken) => {
        /* TODO: Email sender with password recovery token to user can create a new password.

            While this function is not implemented,
            you can pick up the token stored in the database
            or check the node logs.

        */
    }

    resetPassword = async (email, newPassword, recoveryToken) => {
        userUtils.resetPasswordValidation(email, newPassword, recoveryToken);

        const newPasswordHash = await bcrypt.hash(newPassword, 8);

        await userDAO.resetUserPassword(email, newPasswordHash, recoveryToken);
    }
}

module.exports = new UserService();