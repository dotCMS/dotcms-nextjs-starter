const proxy = require('express-http-proxy');

const transformPage = require('./transformPage');
const dotCMSApi = require('./dotcmsApi');
const { loggerLog } = require('../logger');
const { isPage, isAPIRequest, errors } = require('./utilities');
const url = require('url');
const httpProxy = require('http-proxy');

async function getPage(url, lang) {
    loggerLog('DOTCMS PAGE', url, lang || '1');
    return dotCMSApi.page
        .get({
            url: url + "?fireRules=true",
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
    // let proxyOptions;
    //
    // if (isAPIRequest(req.url)) {
    //     loggerLog('DOTCMS PROXY API REQUEST', req.url);
    //     proxyOptions = {
    //         proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    //             proxyReqOpts.headers = {
    //                 ['Authorization']: `Bearer ${process.env.BEARER_TOKEN}`,
    //                 ['Content-Type']: 'application/json'
    //             };
    //             return proxyReqOpts;
    //         }
    //     };
    // } else {
    //     loggerLog('DOTCMS PROXY', req.url);
    // }
    //
    // return proxy(`${process.env.DOTCMS_HOST}${req.url}`, proxyOptions)(req, res, next);

    const { protocol, hostname, port } = url.parse(process.env.DOTCMS_HOST);


    const proxy2 = httpProxy.createProxyServer({
        target: {
            protocol: protocol,
            host: hostname,
            port: port
        },
        xfwd: true,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: {
            [process.env.PUBLIC_URL]: process.env.PUBLIC_URL
        },
        headers: {
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    proxy2.web(req, res)(req, res, next);

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
    errors
};
