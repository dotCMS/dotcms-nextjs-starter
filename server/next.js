const internalPrefixes = [/^\/_next\//, /^\/static\//, /^\/favicon.ico/];
function isNextInternalFile(url) {
    for (const prefix of internalPrefixes) {
        if (prefix.test(url)) {
            return true;
        }
    }

    return false;
}

module.exports = {
    isNextInternalFile
};
