const formatter = require('../../shared/format-error');
const router = require('express').Router();
const service = require('./user.service');

router.post('/', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Users']
        #swagger.description = 'Creates a new User if one does not already exist.'
        #swagger.path = '/api/v1/users/'

        == Params:
        #swagger.parameters['name'] = {
            in: 'body',
            description: 'User name.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['email'] = {
            in: 'body',
            description: 'User email.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['password'] = {
            in: 'body',
            description: 'User password.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['personalNotes'] = {
            in: 'body',
            description: 'User personal notes.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['hometown'] = {
            in: 'body',
            description: 'User hometown.',
            required: true,
            type: 'string'
        }

        == Successful response:
        #swagger.responses[201] = {
            schema: { },
            description: 'User was successfully created.'
        }

        == Error responses:
        #swagger.responses[400] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Validation Error'
        }

        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        await service.createUser(req.body);
        res.status(201).send();
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.post('/login', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Users']
        #swagger.description = 'User login with email and password.'
        #swagger.path = '/api/v1/users/login'

        == Params:
        #swagger.parameters['email'] = {
            in: 'body',
            description: 'User email.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['password'] = {
            in: 'body',
            description: 'User password.',
            required: true,
            type: 'string'
        }

        == Successful response:
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/LoggedInUser" },
            description: 'JSON data'
        }

        == Error responses:
        #swagger.responses[400] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Validation Error'
        }

        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        const { email, password } = req.body;
        const result = await service.doLogin(email, password);
        res.status(200).json(result);
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.patch('/forgot-password', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Users']
        #swagger.description = 'Request a new password.'
        #swagger.path = '/api/v1/users/forgot-password'

        == Params:
        #swagger.parameters['email'] = {
            in: 'body',
            description: 'User email.',
            required: true,
            type: 'string'
        }

        == Successful response:
        #swagger.responses[200] = {
            schema: { },
            description: 'Password has been reset and a recovery token has been sent to the email.'
        }

        == Error responses:
        #swagger.responses[400] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Validation Error'
        }

        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        const { email } = req.body;

        await service.forgotPassword(email);

        res.status(200).send();
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.patch('/change-password', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Users']
        #swagger.description = 'Creates a new password from the token sent by email .'
        #swagger.path = '/api/v1/users/change-password'

        == Params:
        #swagger.parameters['email'] = {
            in: 'body',
            description: 'User email.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['newPassword'] = {
            in: 'body',
            description: 'New User password.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['token'] = {
            in: 'body',
            description: 'Recovery password token.',
            required: true,
            type: 'string'
        }

        == Successful response:
        #swagger.responses[200] = {
            schema: { },
            description: 'The password was successfully changed.'
        }

        == Error responses:
        #swagger.responses[400] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Validation Error'
        }

        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        const { email, newPassword, token } = req.body;

        await service.resetPassword(email, newPassword, token);

        res.status(200).send();
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

module.exports = router;