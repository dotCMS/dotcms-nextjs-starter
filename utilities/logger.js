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

module.exports = { loggerLog, loggerError };
