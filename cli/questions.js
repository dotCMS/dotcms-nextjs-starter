const { DOTCMS } = require('./print')
const inquirer = require('inquirer')

const defaultNodeUrl = 'http://localhost:5000'

const questionsBasic = (param) => [
  {
    message: !!param
      ? '.env FILE FOUND! Would you like to overwrite the env variables in the file?'
      : 'NO .env FILE FOUND! Would you like to create one?',
    type: 'confirm',
    name: 'writeEnv',
  },
  {
    message: `${DOTCMS} URL`,
    name: 'NEXT_PUBLIC_DOTCMS_HOST',
    default:
      (param && param.NEXT_PUBLIC_DOTCMS_HOST) || 'http://localhost:8080',
  },
  {
    message: `Public URL`,
    name: 'NEXT_PUBLIC_DEPLOY_URL',
    default: (param && param.NEXT_PUBLIC_DEPLOY_URL) || defaultNodeUrl,
  },
]

const questionsAuth = [
  {
    message: `${DOTCMS} Email / User Id`,
    name: 'user',
  },
  {
    message: `${DOTCMS} Password`,
    name: 'password',
    type: 'password',
    mask: '*',
  },
  {
    message: 'Token Valid for (in days)',
    name: 'expirationDays',
    default: 10,
  },
]

const getAnswersBasic = (params) => inquirer.prompt(questionsBasic(params))
const getAnswersAuth = () => inquirer.prompt(questionsAuth)

module.exports = { getAnswersBasic, getAnswersAuth }
