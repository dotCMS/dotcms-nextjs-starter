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

const DOTCMS_DOWN = 'DOTCMS_DOWN';
const DOTCMS_NO_LAYOUT = 'DOTCMS_NO_LAYOUT';
const DOTCMS_NO_AUTH = 'DOTCMS_NO_AUTH';

module.exports = { isPage, isAPIRequest, errors: { DOTCMS_DOWN, DOTCMS_NO_LAYOUT, DOTCMS_NO_AUTH } };
