const { loggerError, loggerLog} = require('./logger');
const { isNextInternalFile } = require('./next');

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

module.exports = {
    isNextInternalFile,
    loggerLog,
    loggerError,
    currencyFormatter
};
