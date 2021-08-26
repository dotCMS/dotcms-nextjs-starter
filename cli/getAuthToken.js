const dotCMS = require('../src/lib/dotCMS/dotCMS').default
const { printError } = require('./print')

const getAuthToken = async ({ user, password, expirationDays, host }) => {
  return dotCMS.auth
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
