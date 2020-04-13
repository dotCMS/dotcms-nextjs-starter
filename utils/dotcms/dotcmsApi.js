const { initDotCMS } = require('dotcms');

module.exports = initDotCMS({
    host: `https://starter.dotcms.com`,
    token: process.env.BEARER_TOKEN
});
