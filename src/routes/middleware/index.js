const CustomError = require('../../shared/custom-error');
const environment = require('../../environment/environment');
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const authRoutes = [
    '/api/v1/playlist',
];

exports.checkAuthToken = async (req, res, next) => {
    if (!needsToBeAuth(req.url)) {
        return next();
    }

    const authHeader = req.headers.authorization;
    const error = new CustomError('Unauthorized', 'Authorization Error');

    if (!authHeader) {
        return res.status(403).json(error);
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = await promisify(jwt.verify)(token, environment.appSecret);

        req.userId = decoded.id;
        req.email = decoded.email;
        req.hometown = decoded.hometown;

        return next();
    } catch (err) {
        return res.status(403).json(error);
    }
}

const needsToBeAuth = (path) => {
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
