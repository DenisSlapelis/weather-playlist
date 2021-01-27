const CustomError = require('../../shared/custom-error');
const RequestLogDAO = require('../../webservices/request-log/request-log.dao');
const utils = require('./middleware.utils');

exports.checkAuthToken = async (req, res, next) => {
    if (!utils.needsToBeAuth(req.url)) {
        return next();
    }

    const authHeader = req.headers.authorization;
    const error = new CustomError('Unauthorized', 'Authorization Error');

    if (!authHeader) {
        return res.status(403).json(error);
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = await utils.decodeToken(token);

        req.userId = decoded.id;
        req.email = decoded.email;
        req.hometown = decoded.hometown;

        return next();
    } catch (err) {
        return res.status(403).json(error);
    }
}

exports.saveRequestLog = async (req, res, next) => {
    // Ignore calls in documentation
    if (!req.url.includes('api/v1/doc')) {
        const log = await utils.formatLogInfo(req);
        await RequestLogDAO.insertRequestLog(log).catch(err => {
            console.log('Insert Logs Error: ', err);
            return next();
        });
    }

    return next();
}