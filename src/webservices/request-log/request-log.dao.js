const RequestLog = require('../../db/models/request-log.model');

class RequestLogDAO {
    constructor() {
    }

    insertRequestLog = async ({ method, path, has_authorization_header, user_id, body, params, query, user_agent }) => {

        await RequestLog.create({
            method,
            path,
            has_authorization_header,
            user_id,
            body,
            params,
            query,
            user_agent,
        }).catch(err => {
            console.log('== Error to insert log: ', err);
        });
    }
}

module.exports = new RequestLogDAO();