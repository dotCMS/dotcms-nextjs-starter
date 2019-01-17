require('dotenv').config();

const fetch = require('node-fetch');
const readline = require('readline');
const { spawn } = require('child_process');

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

const user = getQuestion('Email / User Id');
const password = getQuestion('Password');
const expirationDays = getQuestion('Expiration Days (default 10)');

const startCreateReactApp = token => {
    spawn(`REACT_APP_AUTH_TOKEN=${token} npm run ${process.argv[2]}`, {
        stdio: 'inherit',
        shell: true
    });
};

const main = async () => {
    if (process.env.REACT_APP_BEARER_TOKEN) {
        startCreateReactApp(process.env.REACT_APP_BEARER_TOKEN);
    } else {
        let token;

        while (!token) {
            let data = {
                expirationDays: 10
            };

            data.user = await user();
            data.password = await password();
            data.expirationDays = await expirationDays();

            token = await fetch(`${process.env.REACT_APP_DEFAULT_HOST}/api/v1/authentication/api-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.status === 400) {
                        console.log(
                            '------------------------------------\nWRONG CREDENTIALS \n------------------------------------'
                        );
                    }
                    return res.json();
                })
                .then(res => (res.entity ? res.entity.token : null));
        }

        if (token) {
            rl.close();
            console.log(`BEARER TOKEN: ${token}`);
            startCreateReactApp(token);
        }
    }
};

main();