const { initDotCMS } = require('dotcms');

module.exports = initDotCMS({
    host: `https://demo.dotcms.com`,
    token: process.env.BEARER_TOKEN
});
