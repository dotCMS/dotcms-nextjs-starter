const dotCMSApi = require('../../config/dotcmsApi')
const { loggerLog } = require('../logger')

/**
 * Get the navigation menu object from dotcms api
 *
 */
async function getNav(depth, location = '/') {
  if (process.env.NODE_ENV !== 'production') {
    loggerLog('DOTCMS NAV')
  }

  const nav = await dotCMSApi.nav
    .get(depth, location)
    .then((res) => res.children || [])
  const finalNav = [
    {
      href: '/index',
      title: 'Home',
      children: [],
      folder: false,
      hash: 'home',
    },
    ...nav,
  ]
  return finalNav
}

module.exports = getNav
