function isDev() {
    return process.env.NODE_ENV !== 'production';
}

function loggerLog() {
    if (isDev()) {
        console.log(...arguments);
    }
}

function loggerError() {
    if (isDev()) {
        console.error(...arguments);
    }
}

function loggerPageRender(pageRender) {
    const {
        layout: {
            body: { rows }
        }
    } = pageRender;

    rows.forEach(({ columns }) => {
        columns.forEach(({ containers, leftOffset, width, widthPercent, styleClass, left }) => {
            console.table({ containers, leftOffset, width, widthPercent, styleClass, left });
        });
    });
}

module.exports = { loggerLog, loggerError, loggerPageRender };
