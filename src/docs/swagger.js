const model = require('./models');
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/docs/swagger_output.json';
const endpointsFiles = [
    './src/webservices/users/user.controller',
    './src/webservices/playlists/playlist.controller',
    './src/shared/custom-error',
];

const doc = {
    info: {
        version: "1.0.0",
        title: "Weather Playlist API",
        description: "Documentation automatically generated by the <b>swagger.autogen</b> module."
    },
    host: "localhost:4000",
    basePath: "/api/v1/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "Users",
            description: "Endpoints"
        },
        {
            name: "Playlists",
            description: "Endpoints"
        },
    ],
    definitions: {
        LoggedInUser: model.loggedInUserResponse,
        CustomError: model.customError
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc);