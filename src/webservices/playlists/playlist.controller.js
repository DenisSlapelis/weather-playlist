const formatter = require('../../shared/format-error');
const router = require('express').Router();
const service = require('./playlist.service');

router.get('/', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Playlists']
        #swagger.description = 'Returns a playlist based on current weather.'
        #swagger.path = '/api/v1/playlists'

        == Params:
        #swagger.parameters['hometown'] = {
            in: 'header',
            description: 'Header param inside auth token.',
            required: true,
            type: 'string'
        }

        == Successful response:
        #swagger.responses[200] = {
            schema: { },
            description: 'JSON with playlist url.'
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
        const { hometown } = req;
        const result = await service.getPlaylist(hometown);

        res.status(200).json(result);
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

module.exports = router;