const moment = require('moment');
const logger = (req, res, next) => {
    console.log(`Method: ${req.method} --> Url: ${req.originalUrl} --> ${moment().format()}`);
    next();
};

module.exports = logger;