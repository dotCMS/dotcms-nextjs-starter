const {
    dotCmsInstance,
    expirationDays,
    nodePreviewURL,
    password,
    user,
    writeEnv,
    rl
} = require('./questions');

const { DOTCMS, printHeading, printDim, printBright } = require('./print');
const { getParsedEnvFile, createEnvFile } = require('./envFile');

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
    getParsedEnvFile,
    printBright,
    printDim,
    printHeading,
    questions,
    rl,
    createEnvFile
};
