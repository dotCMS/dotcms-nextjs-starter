require('dotenv').config();

const fs = require('fs');
const fetch = require('node-fetch');
const { spawn } = require('child_process');

const { DOTCMS, questions, rl, printHeading, requiredQuestion } = require('./utils');

const setEnvVarTokenAndStartCreateReactApp = token => {
    spawn(`REACT_APP_AUTH_TOKEN=${token} npm run ${process.argv[2]}`, {
        stdio: 'inherit',
        shell: true
    });
};

const printWelcome = () => {
    printHeading(`Welcome to ${DOTCMS} SPA starter`);
    console.log('This utility will walk you through setting up\nall the necessary environmental variables');
};

const parseEnvFile = file => {
    return Object.assign(
        ...file
            .toString()
            .split('\n')
            .filter(line => /^([^=:#]+?)[=:](.*)/.test(line))
            .map(line => {
                const item = line.split('=');
                return {
                    [item[0]]: item[1]
                };
            })
    );
};

const createEnvFile = params => {
    const content = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('\n');

    fs.writeFile('.env', content, (err, data) => {
        console.log(data);
    });
};

const main = () => {
    if (process.env.REACT_APP_BEARER_TOKEN) {
        setEnvVarTokenAndStartCreateReactApp(process.env.REACT_APP_BEARER_TOKEN);
    } else {
        let cliValues = {
            expirationDays: 10,
            writeEnv: true,
            env: {}
        };

        printWelcome();

        fs.readFile('.env', 'utf8', async (err, file) => {
            const parsedEnvFile = err ? {} : parseEnvFile(file);

            if (err) {
                printHeading('No .env file in your system');
                cliValues.writeEnv = await questions.writeEnv().then(res => res === 'y' || res === 'Y');
            }

            cliValues.env.REACT_APP_DOTCMS_HOST = await requiredQuestion(
                questions.dotCmsInstance,
                parsedEnvFile.REACT_APP_DOTCMS_HOST
            );

            cliValues.env.PUBLIC_URL = await requiredQuestion(questions.nodePreviewURL, parsedEnvFile.PUBLIC_URL);

            let token;
            while (!token) {
                printHeading('Authorization');

                cliValues.user = await questions.user();
                cliValues.password = await questions.password();
                cliValues.expirationDays = await questions.expirationDays();

                // console.log(cliValues);

                const url = `${cliValues.env.REACT_APP_DOTCMS_HOST}/api/v1/authentication/api-token`;

                console.log(url);

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
                createEnvFile(cliValues.env);
                setEnvVarTokenAndStartCreateReactApp(token);
            }
        });
    }
};

main();
