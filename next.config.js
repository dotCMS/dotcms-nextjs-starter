const withCss = require('@zeit/next-css');

module.exports = withCss({
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        // Prevent CORS issues in the DotCMS Page Editor
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    }
                ]
            },
        ]
    },

    async rewrites() {
        return [
            // check if Next.js project routes match before we attempt proxying
            {
                source: '/dA/:slug*',
                destination: `${process.env.NEXT_PUBLIC_DOTCMS_HOST}/dA/:slug*`
            },
            {
                source: '/dotcms-webcomponents/:slug*',
                destination: `${process.env.NEXT_PUBLIC_DOTCMS_HOST}/dotcms-webcomponents/:slug*`
            },
            {
                source: '/api/:slug*',
                destination: `${process.env.NEXT_PUBLIC_DOTCMS_HOST}/api/:slug*`
            },
            {
                source: '/images/:slug*',
                destination: `${process.env.NEXT_PUBLIC_DOTCMS_HOST}/images/:slug*`
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
    },
    // When we load the page in the DotCMS editor we need to have
    // absolutes url for he nextjs page
    assetPrefix: process.env.DEPLOY_URL
});