const {
    dotCmsInstance,
    expirationDays,
    nodePreviewURL,
    password,
    user,
    writeEnv,
    rl,
    requiredQuestion
} = require('./questions');

const { DOTCMS, fakeEnv, printHeading, printDim } = require('./print');

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
    printDim,
    printHeading,
    questions,
    rl,
    requiredQuestion
};
