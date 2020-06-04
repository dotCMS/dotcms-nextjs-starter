const { initDotCMS } = require('dotcms');

module.exports = initDotCMS({
    host: process.env.DOTCMS_HOST,
    token: process.env.BEARER_TOKEN
});
