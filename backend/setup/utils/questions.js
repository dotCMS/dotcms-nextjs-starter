import readline from 'readline';
import { DOTCMS, getQuestionHint } from './print';

const getQuestion = label => () => {
    return new Promise((resolve, reject) => {
        rl.question(`${label}: `, answer => {
            resolve(answer);
        });
    });
};

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dotCmsInstance = async current =>
    (await getQuestion(`${DOTCMS} URL ${getQuestionHint(current, 'current')}`)()) || current;

const nodePreviewURL = async current =>
    (await getQuestion(`Node Preview URL ${getQuestionHint(current, 'current')}`)()) || current;

const user = getQuestion(`${DOTCMS} Email / User Id`);
const password = getQuestion(`${DOTCMS} Password`);
const expirationDays = getQuestion(`Token Valid for (in days) ${getQuestionHint('10')}`);

const writeEnv = async existing => {
    const label = existing
        ? 'Would you like to overwrite the env variables in the file?'
        : 'Would you like to create one?';

    return await getQuestion(`${label} (y/n) ${getQuestionHint('y')}`)().then(
        res => res === 'y' || res === 'Y' || res === ''
    );
};

export const questions = {
    dotCmsInstance,
    expirationDays,
    nodePreviewURL,
    password,
    user,
    writeEnv
};
