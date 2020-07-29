const { loggerError, loggerLog } = require('./logger');
const getToken = require('./dotcms');

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
        match.toUpperCase()
    );
    
module.exports = {
    loggerLog,
    loggerError,
    getToken,
    currencyFormatter,
    capitalize
};
