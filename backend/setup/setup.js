import { spawn } from 'child_process';

import {
    DOTCMS,
    questions,
    rl,
    printHeading,
    createEnvFile,
    getParsedEnvFile,
    printBright,
    getToken,
    printError
} from './utils';

const setEnvVarsAndStartApp = vars => {
    let prep = vars
        ? Object.keys(vars)
              .map(key => `${key}=${vars[key]}`)
              .join(' ')
        : '';

    spawn(`${prep} npm run ${process.argv[2]}`, {
        stdio: 'inherit',
        shell: true
    });
};

const printWelcome = () => {
    printHeading(`Welcome to ${DOTCMS} SPA starter`);
    console.log('This utility will walk you through setting up\nall the necessary environmental variables\n');
};

const DEFAULT_ENV_VARS = {
    PUBLIC_URL: 'http://localhost:5000/',
    REACT_APP_DOTCMS_HOST: 'http://localhost:8080'
};

const main = async () => {
    if (process.env.REACT_APP_BEARER_TOKEN) {
        setEnvVarsAndStartApp();
    } else {
        let cliValues = {
            expirationDays: 10,
            writeEnv: true,
            env: DEFAULT_ENV_VARS
        };

        printWelcome();

        const parsedEnvFile = await getParsedEnvFile();

        if (parsedEnvFile) {
            cliValues.env = {
                ...cliValues.env,
                ...parsedEnvFile
            };
            printBright('We found a .env file in your system');
        } else {
            printBright('No .env file in your system');
        }

        cliValues.writeEnv = await questions.writeEnv(!!parsedEnvFile);

        cliValues.env.REACT_APP_DOTCMS_HOST = await questions.dotCmsInstance(cliValues.env.REACT_APP_DOTCMS_HOST);

        cliValues.env.PUBLIC_URL = await questions.nodePreviewURL(cliValues.env.PUBLIC_URL);

        let token;
        while (!token) {
            printHeading('Authorization');

            cliValues.user = await questions.user();
            cliValues.password = await questions.password();
            cliValues.expirationDays = await questions.expirationDays();

            token = await getToken({
                host: cliValues.env.REACT_APP_DOTCMS_HOST,
                user: cliValues.user,
                password: cliValues.password,
                expirationDays: cliValues.expirationDays
            }).catch(err => {
                console.log('\n');
                printError(
                    `Looks like there is a problem with your DotCMS instance at: ${cliValues.env.REACT_APP_DOTCMS_HOST}`
                );
                printError('ERROR: ' + err.message);
                process.exit(1);
            });
        }

        if (token) {
            rl.close();
            cliValues.env.REACT_APP_BEARER_TOKEN = token;

            if (cliValues.writeEnv) {
                createEnvFile(cliValues.env).then(() => {
                    setEnvVarsAndStartApp(cliValues.env);
                });
            } else {
                setEnvVarsAndStartApp(cliValues.env);
            }
        }
    }
};

main();
