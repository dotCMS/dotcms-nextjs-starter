import { DOTCMS } from './print';

import inquirer from 'inquirer';

const questionsBasic = param => [
    {
        message: !!param
            ? '.env FILE FOUND! Would you like to overwrite the env variables in the file?'
            : 'NO .env FILE FOUND! Would you like to create one?',
        type: 'confirm',
        name: 'writeEnv'
    },
    {
        message: `${DOTCMS} URL`,
        name: 'REACT_APP_DOTCMS_HOST',
        default: (param && param.REACT_APP_DOTCMS_HOST) || 'http://localhost:8080'
    },
    {
        message: `Node Preview URL`,
        name: 'PUBLIC_URL',
        default: (param && param.PUBLIC_URL) || 'http://localhost:5000'
    }
];

const questionsAuth = [
    {
        message: `${DOTCMS} Email / User Id`,
        name: 'user'
    },
    {
        message: `${DOTCMS} Password`,
        name: 'password',
        type: 'password',
        mask: '*'
    },
    {
        message: 'Token Valid for (in days)',
        name: 'expirationDays',
        default: 10
    }
];

export const getAnswersBasic = params => inquirer.prompt(questionsBasic(params));
export const getAnswersAuth = () => inquirer.prompt(questionsAuth);
