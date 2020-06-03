const proxy = require('express-http-proxy');

const transformPage = require('./transformPage');
const dotCMSApi = require('./dotcmsApi');
const { loggerLog } = require('../logger');
const { isPage, isAPIRequest, errors } = require('./utilities');
const fetch = require('isomorphic-fetch');

const PAGE_SIZE = 10;

// TODO: Remove
const getPageList = async (from = 0) =>
    await fetch(`${process.env.DOTCMS_HOST}/api/es/search`, {
        method: 'POST',
        headers: {
            Authorization: process.env.BEARER_TOKEN,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            query: {
                query_string: {
                    query: '+(urlmap:?* basetype:5) +contentType:Product'
                }
            },
            size: PAGE_SIZE,
            from: from
        })
    })
        .then((res) => res.json())
        .then(({ contentlets }) => {
            return contentlets;
        });

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

async function getNav(depth, location) {
    loggerLog('DOTCMS NAV');
    const nav = await dotCMSApi.nav.get(depth, location).then(({ children }) => children);

    const finalNav = [
        {
            href: '/index',
            title: 'Home',
            children: [],
            folder: false,
            hash: 'home'
        },
        ...nav.filter((item) => item.href !== '/store')
    ];
    return finalNav;
}

function getLanguages() {
    return dotCMSApi.language.getLanguages();
}

function proxyToStaticFile(req, res, next) {
    let proxyOptions;

    if (isAPIRequest(req.url)) {
        loggerLog('DOTCMS PROXY API REQUEST', req.url);
        loggerLog(`${process.env.DOTCMS_HOST}${req.url}`);
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
    getAllPagesContentlets,
};
