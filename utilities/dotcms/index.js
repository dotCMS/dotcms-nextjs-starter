const CustomError = require('../custom-error');
const dotCMSApi = require('../../config/dotcmsApi');
const getLanguagesProps = require('./getLanguagesProps');
const getPage = require('./getPage');
const getPathsArray = require('./getPathsArray');
const getNav = require('./getNav');

function emitRemoteRenderEdit(url) {
    console.log('emitting event');
    dotCMSApi.event.emit({
        name: 'remote-render-edit',
        data: { pathname: url }
    });
}

module.exports = {
    CustomError,
    getPage,
    getNav,
    emitRemoteRenderEdit,
    getPathsArray,
    getLanguagesProps
};
