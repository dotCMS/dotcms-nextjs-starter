const getLanguagesProps = require('./getLanguagesProps')
const getPage = require('./getPage')
const getPathsArray = require('./getPathsArray')
const getNav = require('./getNav')
const emitEMANavEvent = require('./emitEMANavEvent')

module.exports = {
  getPage,
  getNav,
  emitEMANavEvent,
  getPathsArray,
  getLanguagesProps,
}
