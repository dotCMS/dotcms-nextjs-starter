const { spawn } = require('child_process');

const { getAnswersBasic, getAnswersAuth } = require('./questions');
const { printError, printHeading, DOTCMS } = require('./print');
const { getToken } = require('../utilities/getToken');
const { getParsedEnvFile, createEnvFile } = require('./envFile');

const createEnvVars = (vars, separator) => {
    return vars
        ? Object.keys(vars)
              .map((key) => `${key}=${vars[key]}`)
              .join(separator)
        : '';
};

const printAuthError = (err) => {
    console.log('\n');
    printError('Problem with your DotCMS instance');
    printError('ERROR: ' + err.message);
    process.exit(1);
};

const setEnvVarsAndStartApp = (vars) => {
    let prep = createEnvVars(vars, ' ');

    spawn(`${prep} npm run ${process.argv[2]}`, {
        stdio: 'inherit',
        shell: true
    });
};

const printWelcome = () => {
    printHeading(`Welcome to ${DOTCMS} SPA starter`);
    console.log(
        'This utility will walk you through setting up\nall the necessary environmental variables\n'
    );
};

const main = async () => {
    if (process.env.BEARER_TOKEN && process.env.DOTCMS_HOST && process.env.PUBLIC_URL) {
        setEnvVarsAndStartApp();
    } else {
        printWelcome();

        const parsedEnvFile = await getParsedEnvFile();
        let cliValues = await getAnswersBasic(parsedEnvFile);

        let token;
        while (!token) {
            printHeading('Authorization');

            const auth = await getAnswersAuth(parsedEnvFile);

            cliValues = {
                ...cliValues,
                ...auth
            };

            token = await getToken({
                host: cliValues.DOTCMS_HOST,
                user: cliValues.user,
                password: cliValues.password,
                expirationDays: cliValues.expirationDays
            }).catch(printAuthError);
        }

        if (token) {
            cliValues.BEARER_TOKEN = token;

            const envVars = {
                DOTCMS_HOST: cliValues.DOTCMS_HOST,
                BEARER_TOKEN: cliValues.BEARER_TOKEN,
                PUBLIC_URL: cliValues.PUBLIC_URL
            };

            if (cliValues.writeEnv) {
                createEnvFile(envVars).then(() => {
                    setEnvVarsAndStartApp(envVars);

                    printHeading('.env file created with:');
                    console.log(createEnvVars(envVars, '\n\n'));
                });
            } else {
                printHeading('Starting the app with the following variables:');
                console.log(createEnvVars(envVars, '\n\n'));

                setEnvVarsAndStartApp(envVars);
            }
        }
    }
};

main();
