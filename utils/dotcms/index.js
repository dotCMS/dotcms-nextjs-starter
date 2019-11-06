const proxy = require('express-http-proxy');

const transformPage = require('./transformPage');
const dotCMSApi = require('./dotcmsApi');
const logger = require('../logger');
const { isPage, isAPIRequest, errors } = require('./utilities');

async function getPage(url, lang) {
    let languageId = await dotCMSApi.language.getId(lang);

    logger('DOTCMS PAGE', url, lang || 'en');

    return dotCMSApi.page
        .get({
            url: url,
            language: languageId || 1
        })
        .then(async pageRender => {
            /*
                If the page doesn't have a layout this transformPage function
                will throw an error.
            */
            const transformedPage = await transformPage(pageRender);
            return transformedPage;
        })
        .catch(error => {
            /* 
                Error coming from the DotCMS server when DotCMS instance is down or not accesible
            */
            if (error.code === 'ECONNREFUSED') {
                error.statusCode = errors.DOTCMS_DOWN;
                error.message = 'DotCMS instance is not running or inaccessible';
            }
            /* 
                Error coming from the DotCMS server when the authorization failed
            */
            if (error.statusCode === 401) {
                error.statusCode = errors.DOTCMS_NO_AUTH;
                error.message = 'DotCMS: Invalid User';
            }

            throw error;
        });
}

function getNav() {
    logger('DOTCMS NAV');

    return dotCMSApi.nav.get('4').then(({ children }) => children);
}

function proxyToStaticFile(req, res) {
    let proxyOptions;

    if (isAPIRequest(req.url)) {
        logger('DOTCMS PROXY API REQUEST', req.url);
        proxyOptions = {
            proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
                proxyReqOpts.headers = {
                    ['Authorization']: `Bearer ${process.env.BEARER_TOKEN}`,
                    ['Content-Type']: 'application/json'
                };
                return proxyReqOpts;
            }
        };
    } else {
        logger('DOTCMS PROXY', req.url);
    }

    return proxy(`${process.env.DOTCMS_HOST}${req.url}`, proxyOptions)(req, res);
}

function emitRemoteRenderEdit(url) {
    dotCMSApi.event.emit({
        name: 'remote-render-edit',
        data: { pathname: url }
    });
}

module.exports = { getPage, getNav, transformPage, isPage, proxyToStaticFile, emitRemoteRenderEdit, errors };
