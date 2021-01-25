const userUtils = require('./user.utils');
const userDAO = require('./user.dao');

class UserService {
    constructor() {
    }

    createUser = async ({ name, email, password, personalNotes, hometown }) => {
        await userUtils.userValidation({ name, email, password, personalNotes, hometown });
        await userDAO.createUser({ name, email, password, personalNotes, hometown });
    }
}

module.exports = new UserService();