const publicHost = new URL(process.env.NEXT_PUBLIC_DOTCMS_HOST).hostname;
const deployUrl = new URL(process.env.DEPLOY_URL).hostname;
const domains = Array.from(new Set([publicHost, deployUrl]))

module.exports = {
  images: {
    domains
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            // Prevent CORS issues in the DotCMS Page Editor
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },

  async rewrites() {
    const baseUrl =
      process.env.NEXT_BASE_ASSET_URL || process.env.NEXT_PUBLIC_DOTCMS_HOST

    return [
      // check if Next.js project routes match before we attempt proxying
      {
        source: '/dA/:slug*',
        destination: `${baseUrl}/dA/:slug*`,
      },
      {
        source: '/dotcms-webcomponents/:slug*',
        destination: `${baseUrl}/dotcms-webcomponents/:slug*`,
      },
      {
        source: '/api/:slug*',
        destination: `${baseUrl}/api/:slug*`,
      },
      {
        source: '/images/:slug*',
        destination: `${baseUrl}/images/:slug*`,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    })
    return config
  },
  // When we load the page in the DotCMS editor we need to have
  // absolutes url for he nextjs page
  assetPrefix: process.env.DEPLOY_URL,
}
