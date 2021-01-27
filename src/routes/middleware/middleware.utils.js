const environment = require('../../environment/environment');
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const authRoutes = [
    '/api/v1/playlists',
];

exports.needsToBeAuth = (path) => {
    let needAuth = false;
    const formattedPath = path.endsWith('/') ? path.replace(/\/\s*$/, "") : path;

    for (let i = 0; i < authRoutes.length; i++) {
        const route = authRoutes[i];

        if (route === formattedPath) {
            needAuth = true;
            break;
        }
    }

    return needAuth;
}

exports.formatLogInfo = async (req) => {
    const {
        method,
        path,
        body,
        params,
        query
    } = req;

    const authorization = req.headers.authorization;
    const hasAuthorizationHeader = authorization ? true : false;
    const userId = await checkUserId(authorization);

    const formattedBody = JSON.stringify(body) === '{}' ? null : formatData(body);
    const formattedParams = JSON.stringify(params) === '{}' ? null : formatData(params);
    const formattedQuery = JSON.stringify(query) === '{}' ? null : formatData(query);

    return {
        method,
        path,
        has_authorization_header: hasAuthorizationHeader,
        user_id: userId,
        body: formattedBody,
        params: formattedParams,
        query: formattedQuery,
        user_agent: req.headers['user-agent']
    }
}

exports.decodeToken = async (token) => {
    return promisify(jwt.verify)(token, environment.appSecret);
}

const checkUserId = async (authorization) => {
    if (!authorization)
        return null;

    const [, token] = authorization.split(" ");
    const decoded = await this.decodeToken(token).catch(err => {
        return null;
    });

    return decoded && decoded.id ? decoded.id : null;
}

const formatData = (data) => {
    const result = {};

    for (const key in data) {
        result[key] = (key === 'password' || key === 'personalNotes') ? '' : data[key];
    }

    return JSON.stringify(result);
}
