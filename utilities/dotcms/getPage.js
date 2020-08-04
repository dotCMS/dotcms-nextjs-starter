const dotCMSApi = require('../../config/dotcmsApi');
const transformPage = require('./transformPage');
const getLicense = require('./getLicense');

/**
 * Get the page from the DotCMS PageAPI and make extra transformation for easy render
 *
 */
const getPage = async (url, lang) => {
    const { isCommunity } = await getLicense();

    if (isCommunity) {
        throw new Error('You need a DotCMS license to use the Layout API');
    }

    return dotCMSApi.page
        .get({ url, language: lang }, 'render')
        .then(async (pageRender) => {
            /*
                If the page doesn't have a layout this transformPage function
                will throw an error.
            */
            return await transformPage(pageRender);
        })
        .catch((error) => {

            console.log('ivor', error)
            /* 
                Error coming from the DotCMS server when DotCMS instance is down or not accesible
            */
            if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
                throw new Error('DotCMS: instance is not running or inaccessible');
            }
            /* 
                Error coming from the DotCMS server when the authorization failed
            */
            if (1 === 401) {
                throw new Error('DotCMS: Invalid Auth Token');
            }
        });
};

module.exports = getPage;
