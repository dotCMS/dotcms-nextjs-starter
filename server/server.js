const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('query-string');

const next = require('next');
const app = next({ dev: true });
const handle = app.getRequestHandler();

const transformPage = require('../utilities/dotcms/transformPage');
const { getNav, getLanguagesProps } = require('../utilities/dotcms');
const { loggerLog } = require('../utilities/logger');

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
            res.set('Access-Control-Allow-Origin', '*')
            handle(req, res);
        });

        server.post('*', formUrlEncodedParser, async (req, res) => {
            try {
                loggerLog('DOTCMS EDIT MODE');
                const page = JSON.parse(querystring.parse(req.body.toString()).dotPageData).entity;
                const pageRender = await transformPage(page);
                const nav = await getNav(4);
                app.setAssetPrefix(`${process.env.DEPLOY_URL}`);

                const { languageId, hasLanguages, ...rest } = await getLanguagesProps();

                app.render(req, res, '/ema', {
                    pageRender,
                    nav,
                    languageProps: { languageId, hasLanguages, ...rest }
                });
            } catch (error) {
                res.send(error);
            }
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
