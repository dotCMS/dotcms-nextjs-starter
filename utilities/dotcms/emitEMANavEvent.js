const dotCMSApi = require('../../config/dotcmsApi');

/**
 * When we are in EMA we need to tell dotcms that we are moving to another page,
 * we do it by emiting a custom event fom our web app
 */
function emitEMANavEvent(url) {
    dotCMSApi.event.emit({
        name: 'remote-render-edit',
        data: { pathname: url }
    });
}

module.exports = emitEMANavEvent