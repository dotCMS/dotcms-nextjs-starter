const withCss = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');
const prod = process.env.NODE_ENV === 'production';

module.exports = withCss({
    env: {
        BACKEND_URL: '', //prod ? '/dotcms-spa' : ''
    },
    // exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    //     return {
    //         '/': '/dotcms-spa'
    //     };
    // },
    // assetPrefix: prod ? 'https://dotcms.github.io/dotcms-spa/' : '',
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
        config.plugins.push(new Dotenv({ silent: true }));
        return config;
    }
});
