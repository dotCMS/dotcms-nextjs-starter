const { loggerError, loggerLog} = require('./logger');
const { isNextInternalFile } = require('./next');

module.exports = {
    isNextInternalFile,
    loggerLog,
    loggerError
};
