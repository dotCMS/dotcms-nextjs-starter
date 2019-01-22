const { dotCmsInstance, expirationDays, nodePreviewURL, password, user, writeEnv, rl } = require('./questions');

const { DOTCMS, fakeEnv, printHeading } = require('./print');

const questions = {
    dotCmsInstance,
    expirationDays,
    nodePreviewURL,
    password,
    user,
    writeEnv
};

module.exports = {
    DOTCMS,
    fakeEnv,
    printHeading,
    questions,
    rl
};
