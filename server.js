require('dotenv').config();

const express = require('express');
const next = require('next');
const querystring = require('query-string');
const bodyParser = require('body-parser');
const { getCookie, LANG_COOKIE_NAME } = require('./utils/dotcms/utilities');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { isNextInternalFile, loggerLog } = require('./utils');
const dotcms = require('./utils/dotcms');
const fs = require('fs');
var cert = fs.readFileSync('./utils/dotcms/fakecert.txt');
const httpProxy = require('http-proxy');
const url = require('url');

const formUrlEncodedParser = bodyParser.raw({
    type: 'application/x-www-form-urlencoded',
    limit: '10mb',
    extended: true
});

function getCurrentLanguage(cookie) {
    return getCookie(cookie, LANG_COOKIE_NAME) || '1';
}

function isStaticPage(path) {
    const staticPages = ['/blog/post'];
    return !!staticPages.filter((item) => path.startsWith(item)).length;
}

app.prepare()
    .then(() => {
        const server = express();

        server.get('*', async (req, res, next) => {
            if (isNextInternalFile(req.path)) {
                return handle(req, res);
            }

            try {
                const url = req.path;
                if (dotcms.isPage(url)) {
                    if (isStaticPage(url)) {
                        return handle(req, res);
                    }

                    const pageRender = await dotcms.getPage(
                        url,
                        getCurrentLanguage(req.headers.cookie)
                    );

                    return app.render(req, res, '/dotcms', { pageRender });
                } else {
                    return dotcms.proxyToStaticFile(req, res, next);
                }
            } catch (error) {
                /*
                    If the request to DotCMS fail we have a fallback chain in place.
                */
                switch (error.statusCode) {
                    /*
                        If the page doesn't have a layout we render the error using next right away.
                    */
                    case dotcms.errors.DOTCMS_NO_LAYOUT:
                        res.statusCode = 406; // Not Acceptable
                        error.statusCode = res.statusCode;
                        error.traceError = error.stack;

                        app.renderError(null, req, res, req.path, {
                            customError: error
                        });
                        break;

                    case dotcms.errors.DOTCMS_CUSTOM_ERROR:
                        res.statusCode = 406; // Not Acceptable
                        error.statusCode = 500;
                        error.traceError = error.stack;

                        app.renderError(null, req, res, req.path, {
                            customError: error
                        });
                        break;
                    /*
                        But if the request to DotCMS fail because the instance is down or auth
                        wasn't sucessuful, we try to render the page using next static page feature.

                        If the page exist in next all good but if not next will render a 404.

                        Also we are setting in dev mode a dotcmsStatus message that we will render
                        in all the pages just in edit mode to tell developers that something is up
                        with the DotCMS instance they are trying to reach.
                    */
                    case dotcms.errors.DOTCMS_DOWN:
                    case dotcms.errors.DOTCMS_NO_AUTH:
                        let dotcmsStatus;

                        if (dev) {
                            dotcmsStatus = error.message;
                        }

                        app.render(req, res, req.path, { dotcmsStatus });
                        break;
                    default:
                        app.renderError(null, req, res, req.path, {
                            customError: error
                        });
                }
            }

            return handle(req, res);
        });

        /*
            We can assume (at least for now) that all requests to /api/* are meant
            to DotCMS instance, so we just proxy them.
        */

        server.post('/api/*', async (req, res) => dotcms.proxyToStaticFile(req, res));
        server.put('/api/*', async (req, res) => dotcms.proxyToStaticFile(req, res));



        // server.post('/api/*', async (req, res) => {
        //     const { protocol, hostname, port } = url.parse(process.env.DOTCMS_HOST);
        //     console.log('---- SERVER POST ----')
        //
        //
        //     try {
        //         const proxyConfig = {
        //             target: {
        //                 protocol: protocol,
        //                 host: hostname,
        //                 port: port
        //             },
        //             xfwd: true,
        //             changeOrigin: true,
        //             secure: true,
        //             cookieDomainRewrite: {
        //                 [process.env.PUBLIC_URL]: process.env.PUBLIC_URL
        //             },
        //             headers: {
        //                 'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        //                 'Content-Type': 'application/json'
        //             }
        //         }
        //         console.log(proxyConfig);
        //         const proxy = httpProxy.createProxyServer(proxyConfig);
        //
        //         proxy.web(req, res);
        //     }catch {
        //         console.log('-----------ERROR--------');
        //     }
        //     return;
        // });


       // server.post('/api/*', async (req, res) => dotcms.proxyToStaticFile(req, res, cert));
       // server.put('/api/*', async (req, res) => dotcms.proxyToStaticFile(req, res, cert));

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
            app.render(req, res, '/dotcms', { pageRender, isBeingEditFromDotCMS: true });
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log(`> Ready on ${process.env.PUBLIC_URL}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
