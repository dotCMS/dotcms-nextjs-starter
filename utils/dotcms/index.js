const proxy = require('express-http-proxy');

const transformPage = require('./transformPage');
const dotCMSApi = require('./dotcmsApi');
const { loggerLog } = require('../logger');
const { isPage, isAPIRequest, errors } = require('./utilities');
const fetch = require('isomorphic-fetch');

const PAGE_SIZE = 10;

const getPageList = async (from = 0) =>
    await fetch(`${process.env.DOTCMS_HOST}/api/es/search`, {
        method: 'POST',
        headers: {
            Authorization: process.env.TOKEN,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            query: {
                query_string: {
                    query: '+(urlmap:?* basetype:5)'
                }
            },
            size: PAGE_SIZE,
            from: from
        })
    })
        .then((res) => res.json())
        .then(({ contentlets }) => contentlets);

async function getAllPagesContentlets() {
    let counter = 0;
    let current = await getPageList();
    let results = current;

    while (current.length > 0) {
        counter = counter + 1;
        current = await getPageList(counter * PAGE_SIZE);
        results = [...results, ...current];
    }

    return results;
}

async function getPage(url, lang) {
    loggerLog('DOTCMS PAGE', url, lang || '1');
    return dotCMSApi.page
        .get({
            url: url,
            language: lang || 1
        })
        .then(async (pageRender) => {
            /*
                If the page doesn't have a layout this transformPage function
                will throw an error.
            */
            const transformedPage = await transformPage(pageRender);
            return transformedPage;
        })
        .catch((error) => {
            /* 
                Error coming from the DotCMS server when DotCMS instance is down or not accesible
            */
            if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
                error.statusCode = errors.DOTCMS_DOWN;
                error.message = 'DotCMS: instance is not running or inaccessible';
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
    loggerLog('DOTCMS NAV');
    return dotCMSApi.nav.get('4').then(({ children }) => children);
}

function getLanguages() {
    return dotCMSApi.language.getLanguages();
}

function proxyToStaticFile(req, res, next) {
    let proxyOptions;

    if (isAPIRequest(req.url)) {
        loggerLog('DOTCMS PROXY API REQUEST', req.url);
        proxyOptions = {
            proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
                proxyReqOpts.headers = {
                    ['Authorization']: `Bearer ${process.env.BEARER_TOKEN}`,
                    ['Content-Type']: 'application/json'
                };
                return proxyReqOpts;
            }
        };
    } else {
        loggerLog('DOTCMS PROXY', req.url);
    }

    return proxy(`${process.env.DOTCMS_HOST}${req.url}`, proxyOptions)(req, res, next);
}

function emitRemoteRenderEdit(url) {
    dotCMSApi.event.emit({
        name: 'remote-render-edit',
        data: { pathname: url }
    });
}

module.exports = {
    getPage,
    getNav,
    transformPage,
    isPage,
    proxyToStaticFile,
    emitRemoteRenderEdit,
    getLanguages,
    errors,
    getAllPagesContentlets
};
