const environment = require('../../environment/environment');
const CustomError = require('../../shared/custom-error');
const userDAO = require('./user.dao');
const jwt = require("jsonwebtoken");

class UserUtils {
    constructor() {
        //
    }

    userValidation = async ({ name, email, password, personalNotes, hometown }) => {
        this.nameValidation(name);
        this.emailValidation(email);
        this.passwordValidation(password);
        this.personalNotesdValidation(personalNotes);
        this.hometowndValidation(hometown);
        await this.checksIfuserAlreadyExists(email);
    }

    loginValidation = async (email, password) => {
        this.emailValidation(email);
        this.passwordValidation(password);
    }

    nameValidation = (name) => {
        if (!name)
            throw new CustomError('Required param name was not found', 'Validation Error');
    }

    emailValidation = (email) => {
        if (!email)
            throw new CustomError('Required param email was not found', 'Validation Error');

        const emailExpression = /(?!:\/\/)@([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}/gm;
        const validEmail = new RegExp(emailExpression);

        if (!email.match(validEmail))
            throw new CustomError('Invalid email', 'Validation Error');
    }

    passwordValidation = (password) => {
        if (!password)
            throw new CustomError('Required param password was not found', 'Validation Error');

        if (password.length < 6)
            throw new CustomError('The password must contain at least 6 characters', 'Validation Error');

        const numbersExpression = /\d/;
        const numbers = new RegExp(numbersExpression);

        if (!password.match(numbers))
            throw new CustomError('The password must contain numbers', 'Validation Error');

        const lettersExpression = /[a-zA-Z]/;
        const letters = new RegExp(lettersExpression);

        if (!password.match(letters))
            throw new CustomError('The password must contain letters', 'Validation Error');
    }

    personalNotesdValidation = (personalNotes) => {
        if (!personalNotes)
            throw new CustomError('Required param personalNotes was not found', 'Validation Error');

        if (!Array.isArray(personalNotes))
            throw new CustomError('Invalid personalNotes', 'Validation Error');
    }

    hometowndValidation = (hometown) => {
        if (!hometown)
            throw new CustomError('Required param hometown was not found', 'Validation Error');
    }

    checksIfuserAlreadyExists = async (email) => {
        const result = await userDAO.getUserByEmail(email);

        if (result && result.dataValues)
            throw new CustomError('There is already a registered user with this email', 'Validation Error');
    }

    formatLoginResponse = (user) => {
        const { email, id } = user;
        const { name, hometown } = user.User.dataValues;
        const token = jwt.sign({ id, email, hometown }, environment.appSecret);

        return {
            user: {
                email,
                name,
                hometown
            },
            token
        }
    }
}

module.exports = new UserUtils();