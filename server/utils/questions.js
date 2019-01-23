const readline = require('readline');

const { DOTCMS, getQuestionHint } = require('./print');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getQuestion = label => () => {
    return new Promise((resolve, reject) => {
        rl.question(`${label}: `, answer => {
            resolve(answer);
        });
    });
};

const dotCmsInstance = async current =>
    (await getQuestion(`${DOTCMS} URL ${getQuestionHint(current, 'current')}`)()) || current;

const expirationDays = getQuestion(`Token Valid for (in days) ${getQuestionHint('10')}`);
const nodePreviewURL = async current =>
    (await getQuestion(`Node Preview URL ${getQuestionHint(current, 'current')}`)()) || current;
const password = getQuestion(`${DOTCMS} Password`);
const user = getQuestion(`${DOTCMS} Email / User Id`);
const writeEnv = async existing => {
    const label = existing
        ? 'Would you like to overwrite the env variables in the file?'
        : 'Would you like to create one?';

    return await getQuestion(`${label} (y/n) ${getQuestionHint('y')}`)();
};

module.exports = {
    dotCmsInstance,
    expirationDays,
    nodePreviewURL,
    password,
    rl,
    user,
    writeEnv
};
