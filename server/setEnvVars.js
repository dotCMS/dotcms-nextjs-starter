require('dotenv').config();

const fetch = require('node-fetch');
const { spawn } = require('child_process');

const { DOTCMS, questions, rl, printHeading, createEnvFile, getParsedEnvFile, printBright } = require('./utils');

const setEnvVarsTokenAndStartCreateReactApp = vars => {
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
        setEnvVarsTokenAndStartCreateReactApp(process.env.REACT_APP_BEARER_TOKEN);
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

        cliValues.writeEnv = await questions.writeEnv(!!parsedEnvFile).then(res => res === 'y' || res === 'Y');

        cliValues.env.REACT_APP_DOTCMS_HOST = await questions.dotCmsInstance(cliValues.env.REACT_APP_DOTCMS_HOST);

        cliValues.env.PUBLIC_URL = await questions.nodePreviewURL(cliValues.env.PUBLIC_URL);

        let token;
        while (!token) {
            printHeading('Authorization');

            cliValues.user = await questions.user();
            cliValues.password = await questions.password();
            cliValues.expirationDays = await questions.expirationDays();

            const url = `${cliValues.env.REACT_APP_DOTCMS_HOST}/api/v1/authentication/api-token`;

            token = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: cliValues.user,
                    password: cliValues.password
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    if (res.status === 400 || res.status === 401) {
                        console.log(
                            '------------------------------------\nWRONG CREDENTIALS \n------------------------------------'
                        );
                    } else {
                        console.log(
                            `------------------------------------\nERROR ${
                                res.status
                            }\n------------------------------------`
                        );
                    }

                    return {};
                })
                .then(res => (res.entity ? res.entity.token : null));
        }

        if (token) {
            rl.close();
            cliValues.env.REACT_APP_BEARER_TOKEN = token;

            if (cliValues.writeEnv) {
                createEnvFile(cliValues.env).then(setEnvVarsTokenAndStartCreateReactApp)
            } else {
                setEnvVarsTokenAndStartCreateReactApp(cliValues.env);
            }
        }
    }
};

main();
