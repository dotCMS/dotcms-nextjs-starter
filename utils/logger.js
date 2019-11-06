function logger() {
    if (process.env.NODE_ENV !== 'production') {
        console.log(...arguments);
    }
}

module.exports = logger;
