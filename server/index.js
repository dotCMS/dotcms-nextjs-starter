require('ignore-styles');
require('dotenv').config();
require('@babel/polyfill');
require('@babel/register')({
    ignore: [/\/(public|node_modules)\//],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true
            }
        ]
    ]
});

require('./server');