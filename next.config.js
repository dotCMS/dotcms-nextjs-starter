const withCss = require('@zeit/next-css');
// const Dotenv = require('dotenv-webpack');

module.exports = withCss({
    experimental: {
        optionalCatchAll: true
    }
});
