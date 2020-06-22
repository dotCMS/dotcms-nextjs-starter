const withCss = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');

module.exports = withCss({
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]'
                }
            }
        });
        config.plugins.push(new Dotenv({ silent: false }));
        return config;
    },
    experimental: {
        optionalCatchAll: true
    }
});
