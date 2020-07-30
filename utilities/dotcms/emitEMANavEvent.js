const dotCMSApi = require('../../config/dotcmsApi');

function emitEMANavEvent(url) {
    console.log('emitting event');
    dotCMSApi.event.emit({
        name: 'remote-render-edit',
        data: { pathname: url }
    });
}

module.exports = emitEMANavEvent