const CustomError = require('../../shared/custom-error');
const userUtils = require('./user.utils');
const userDAO = require('./user.dao');
const bcrypt = require('bcryptjs');

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
}

module.exports = new UserService();