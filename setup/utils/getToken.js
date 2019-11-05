const dotcmsApi = require('../../utils/dotcms/dotcmsApi');
const { printError } = require('./index');

const getToken = ({ user, password, expirationDays, host }) => {
    return dotcmsApi.auth
        .getToken({ user, password, expirationDays, host })
        .then(res => res)
        .catch(err => {
            if (err.status === 400 || err.status === 401) {
                console.log('\n');
                printError(err.message);
                return;
            }
            throw err;
        });
};

module.exports = { getToken };
