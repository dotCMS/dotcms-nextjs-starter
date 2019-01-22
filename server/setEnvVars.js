require('dotenv').config();

const fetch = require('node-fetch');
const { spawn } = require('child_process');

const { fakeEnv, DOTCMS, questions, rl, printHeading } = require('./utils');

const setEnvVarTokenAndStartCreateReactApp = token => {
    spawn(`REACT_APP_AUTH_TOKEN=${token} npm run ${process.argv[2]}`, {
        stdio: 'inherit',
        shell: true
    });
};

const printWelcome = () => {
    printHeading(`Welcome to ${DOTCMS} SPA starter`);
    console.log('This utility will walk you through setting up\nall the necessary environmental variables\n\n');
};

const main = async () => {
    if (process.env.REACT_APP_BEARER_TOKEN) {
        setEnvVarTokenAndStartCreateReactApp(process.env.REACT_APP_BEARER_TOKEN);
    } else {
        let data = {
            expirationDays: 10
        };

        printWelcome();

        data.dotcmsInstance = (await questions.dotCmsInstance()) || fakeEnv.REACT_APP_DEFAULT_HOST;
        data.nodePreviewURL = (await questions.nodePreviewURL()) || fakeEnv.PUBLIC_URL;
        data.writeEnv = await questions.writeEnv().then(res => res === 'y' || res === 'Y');

        let token;
        while (!token) {
            printHeading('Authorization');

            data.user = await questions.user();
            data.password = await questions.password();
            data.expirationDays = await questions.expirationDays();

            token = await fetch(`${process.env.REACT_APP_DEFAULT_HOST}/api/v1/authentication/api-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
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
            console.log(`BEARER TOKEN: ${token}`);
            setEnvVarTokenAndStartCreateReactApp(token);
        }
    }
};

main();
