const dotCMSApi = require('../../config/dotcmsApi');
const transformPage = require('./transformPage');
const { DOTCMS_DOWN, DOTCMS_NO_AUTH } = require('./constants');

/**
 * Get the page from the DotCMS PageAPI and make extra transformation for easy render
 * 
 */
const getPage = (url, lang) => {
    if (process.env.NODE_ENV !== 'production') {
        // loggerLog('DOTCMS PAGE', url, lang || '1');
    }
    return dotCMSApi.page
        .get({ url, language: lang })
        .then(async (pageRender) => {
            /*
                If the page doesn't have a layout this transformPage function
                will throw an error.
            */
            return await transformPage(pageRender);
        })
        .catch((error) => {
            /* 
                Error coming from the DotCMS server when DotCMS instance is down or not accesible
            */
            if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
                error.statusCode = DOTCMS_DOWN;
                error.message = 'DotCMS: instance is not running or inaccessible';
            }
            /* 
                Error coming from the DotCMS server when the authorization failed
            */
            if (error.statusCode === 401) {
                error.statusCode = DOTCMS_NO_AUTH;
                error.message = 'DotCMS: Invalid Auth Token';
            }

            throw error;
        });
};

module.exports = getPage;
