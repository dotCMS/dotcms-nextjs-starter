require('dotenv').config();
const express = require('express');
const next = require('next');
const querystring = require('query-string');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const { loggerLog } = require('../utilities/logger');
const dotcms = require('../config/dotcms');

const formUrlEncodedParser = bodyParser.raw({
    type: 'application/x-www-form-urlencoded',
    limit: '10mb',
    extended: true
});

app.prepare()
    .then(() => {
        const server = express();

        server.get('*', (req, res) => {
            res.send('DotCMS Edit Mode Server');
        })

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
            app.setAssetPrefix(process.env.PUBLIC_URL);
            app.render(req, res, req.path, { pageRender, isBeingEditFromDotCMS: true });
        });

        server.listen(5000, (err) => {
            if (err) throw err;
            console.log(`> Ready on ${process.env.PUBLIC_URL}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
