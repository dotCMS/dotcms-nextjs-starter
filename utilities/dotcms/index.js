const transformPage = require('./transformPage');
const dotCMSApi = require('./dotcmsApi');
const { loggerLog } = require('../logger');
import {
    DOTCMS_DOWN,
    DOTCMS_NO_LAYOUT,
    DOTCMS_NO_AUTH,
    DOTCMS_CUSTOM_ERROR,
    LANG_COOKIE_NAME
} from './constants';

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

async function getNav(depth) {
    loggerLog('DOTCMS NAV');
    const nav = await dotCMSApi.nav.get(depth).then(({ children }) => children);

    const finalNav = [
        {
            href: '/index',
            title: 'Home',
            children: [],
            folder: false,
            hash: 'home'
        },
        ...nav
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
        loggerLog(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}${req.url}`);
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

    // return proxy(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}${req.url}`, proxyOptions)(req, res, next);
}

function emitRemoteRenderEdit(url) {
    dotCMSApi.event.emit({
        name: 'remote-render-edit',
        data: { pathname: url }
    });
}

const path = require('path');

function isAPIRequest(url) {
    return url.startsWith('/api');
}
function isDotCMSAsset(url) {
    return url.startsWith('/contentAsset/') || url.startsWith('/dA/');
}

function isHtmlOrFolder(url) {
    const ext = path.parse(url).ext;
    return ext.length === 0 || ext === '.html';
}

function isPage(url) {
    return !isDotCMSAsset(url) && !isAPIRequest(url) && isHtmlOrFolder(url);
}

function getCookie(cookies, name) {
    if (cookies) {
        const match = cookies.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : '';
    }

    return '';
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}`;
}

class CustomError extends Error {
    constructor(message = '', statusCode = DOTCMS_CUSTOM_ERROR, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.name = 'CustomError';
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = {
    isAPIRequest,
    CustomError,
    getCookie,
    setCookie,
    LANG_COOKIE_NAME,
    getPage,
    getNav,
    transformPage,
    isPage,
    proxyToStaticFile,
    emitRemoteRenderEdit,
    getLanguages,
    errors: { DOTCMS_DOWN, DOTCMS_NO_LAYOUT, DOTCMS_NO_AUTH, DOTCMS_CUSTOM_ERROR }
};
