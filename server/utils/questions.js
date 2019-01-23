const readline = require('readline');

const { DOTCMS, getQuestionHint, printDim } = require('./print');

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
const writeEnv = getQuestion(`Looks like you don't have a .env file in your project.\nWould you like to create one? (y/n) ${getQuestionHint('y')}`);

const requiredQuestion = async (question, defaultAnswer) => {
    let answer;
    let counter = 0;

    while(!answer) {
        answer = await question(defaultAnswer);

        if (!answer) {
            counter++;
        }

        if (counter) {
            printDim('\nThis is a required field');
        }
    }

    return answer
}

module.exports = {
    dotCmsInstance,
    expirationDays,
    nodePreviewURL,
    password,
    rl,
    user,
    writeEnv,
    requiredQuestion
};
