const dotCMSApi = require('../src/config/dotcmsApi')
const { printError } = require('./print')

const getAuthToken = async ({ user, password, expirationDays, host }) => {
  return dotCMSApi.auth
    .getToken({ user, password, expirationDays, host })
    .then((res) => res)
    .catch((err) => {
      if (err.status === 400 || err.status === 401) {
        console.info('\n')
        printError(err.message)
        return
      }
      throw err
    })
}

module.exports = getAuthToken
