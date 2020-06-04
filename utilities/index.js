const { loggerError, loggerLog} = require('./logger');
const { isNextInternalFile } = require('./shared');
const getToken = require('./getToken');

module.exports = {
    isNextInternalFile,
    loggerLog,
    loggerError,
    getToken
};
