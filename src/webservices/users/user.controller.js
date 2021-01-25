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

module.exports = router;