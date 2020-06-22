require('dotenv').config();
const express = require('express');
const next = require('next');
const querystring = require('query-string');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const { loggerLog } = require('../utilities/logger');
const dotcms = require('../config/dotcms');

const handle = app.getRequestHandler();

const formUrlEncodedParser = bodyParser.raw({
    type: 'application/x-www-form-urlencoded',
    limit: '10mb',
    extended: true
});
const port = process.env.PORT || 5000;
app.prepare()
    .then(() => {
        const server = express();

        server.get('*', (req, res) => {
            handle(req, res);
        });

        /*
            DotCMS Edit Mode Anywhere Plugin works by sending a POST request to the configured
            server with the page object in the body, so:

            1. We parse the body
            2. Set absolute url to the assets for correct rendering inside DotCMS
            3. Render the page using nextjs api
        */
        server.post('*', formUrlEncodedParser, async (req, res) => {
            loggerLog('DOTCMS EDIT MODE');
            const page = JSON.parse(querystring.parse(req.body.toString()).dotPageData).entity;
            const pageRender = await dotcms.transformPage(page);
            const nav = await dotcms.getNav(4);
            app.setAssetPrefix('https://dotcms-spa.herokuapp.com');
            app.render(req, res, '/ema', { pageRender, nav });
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
