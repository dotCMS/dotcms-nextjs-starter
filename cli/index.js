const { spawn } = require('child_process')
const { getAnswersBasic, getAnswersAuth } = require('./questions')
const { printError, printHeading, DOTCMS } = require('./print')
const { getParsedEnvFile, createEnvFile } = require('./envFile')
const hasYarn = require('./hasYarn')
const getAuthToken = require('./getAuthToken')

const createEnvVars = (vars, separator) => {
  return vars
    ? Object.keys(vars)
        .map((key) => `${key}=${vars[key]}`)
        .join(separator)
    : ''
}

const printAuthError = (err) => {
  console.info('\n')
  printError('Problem with your DotCMS instance')
  printError('ERROR: ' + err.message)
  process.exit(1)
}

const setEnvVarsAndStartApp = (vars) => {
  const packageManager = hasYarn() ? 'yarn' : 'npm'

  if (process.argv[2]) {
    spawn(`${packageManager} run ${process.argv[2]}`, {
      stdio: 'inherit',
      shell: true,
    })
  }
}

const printWelcome = () => {
  printHeading(`Welcome to ${DOTCMS} SPA starter`)
  console.info(
    'This utility will walk you through setting up\nall the necessary environmental variables\n'
  )
}

const main = async () => {
  if (process.env.BEARER_TOKEN && process.env.NEXT_PUBLIC_DOTCMS_HOST) {
    setEnvVarsAndStartApp()
  } else {
    printWelcome()

    const parsedEnvFile = await getParsedEnvFile()
    let cliValues = await getAnswersBasic(parsedEnvFile)

    let token
    while (!token) {
      printHeading('Authorization')

      const auth = await getAnswersAuth(parsedEnvFile)

      cliValues = {
        ...cliValues,
        ...auth,
      }

      token = await getAuthToken({
        host: cliValues.NEXT_PUBLIC_DOTCMS_HOST,
        user: cliValues.user,
        password: cliValues.password,
        expirationDays: cliValues.expirationDays,
      }).catch(printAuthError)
    }

    if (token) {
      cliValues.BEARER_TOKEN = token

      const envVars = {
        NEXT_PUBLIC_DOTCMS_HOST: cliValues.NEXT_PUBLIC_DOTCMS_HOST,
        NEXT_PUBLIC_DEPLOY_URL: cliValues.NEXT_PUBLIC_DEPLOY_URL,
        BEARER_TOKEN: cliValues.BEARER_TOKEN,
      }

      if (cliValues.writeEnv) {
        createEnvFile(envVars).then(() => {
          setEnvVarsAndStartApp(envVars)

          printHeading('.env file created with:')
          console.info(createEnvVars(envVars, '\n\n'))
        })
      } else {
        printHeading('Starting the app with the following variables:')
        console.info(createEnvVars(envVars, '\n\n'))

        setEnvVarsAndStartApp(envVars)
      }
    }
  }
}

main()
