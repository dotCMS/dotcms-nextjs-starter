const { initDotCMS } = require('dotcms')

module.exports = initDotCMS({
  host: process.env.NEXT_PUBLIC_DOTCMS_HOST,
  token: process.env.BEARER_TOKEN,
})
