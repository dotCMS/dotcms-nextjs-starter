const dotCMSApi = require('../../config/dotcmsApi');

/**
 * Get DotCMS license information
 *
 */
const getLicense = () =>
    dotCMSApi.config
        .get()
        .then(({ license }) => license)
        .catch((error) => {
            throw error;
        });

module.exports = getLicense;
