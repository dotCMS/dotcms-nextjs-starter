const readline = require('readline');

const { fakeEnv, DOTCMS, getDefaultValue } = require('./print');

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


const dotCmsInstance = getQuestion(`${DOTCMS} URL ${getDefaultValue(fakeEnv.REACT_APP_DEFAULT_HOST)}`);
const expirationDays = getQuestion(`Token Valid for (in days) ${getDefaultValue('10')}`);
const nodePreviewURL = getQuestion(`Node Preview URL ${getDefaultValue(fakeEnv.PUBLIC_URL)}`);
const password = getQuestion(`${DOTCMS} Password`);
const user = getQuestion(`${DOTCMS} Email / User Id`);
const writeEnv = getQuestion(`Would you like to write this values to .env? (y/n) ${getDefaultValue('n')}`);

module.exports = {
    dotCmsInstance,
    expirationDays,
    nodePreviewURL,
    password,
    rl,
    user,
    writeEnv
};
