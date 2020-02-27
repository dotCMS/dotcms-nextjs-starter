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

const DOTCMS_DOWN = 'DOTCMS_DOWN';
const DOTCMS_NO_LAYOUT = 'DOTCMS_NO_LAYOUT';
const DOTCMS_NO_AUTH = 'DOTCMS_NO_AUTH';
const DOTCMS_CUSTOM_ERROR = 'DOTCMS_CUSTOM_ERROR';
const LANG_COOKIE_NAME = 'dotSPALang';

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
    isPage,
    isAPIRequest,
    CustomError,
    getCookie,
    setCookie,
    LANG_COOKIE_NAME,
    errors: { DOTCMS_DOWN, DOTCMS_NO_LAYOUT, DOTCMS_NO_AUTH, DOTCMS_CUSTOM_ERROR },
    isAPIRequest
};
