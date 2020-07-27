const withCss = require('@zeit/next-css');

module.exports = withCss({
    async rewrites() {
        return [
            // check if Next.js project routes match before we attempt proxying
            {
                source: '/dA/:slug*',
                destination: `https://starter.dotcms.com:8443/dA/:slug*`
            }
        ];
    },
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
        return config;
    }
});