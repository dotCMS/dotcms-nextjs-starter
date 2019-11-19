require('dotenv').config();

const express = require('express');
const next = require('next');
const querystring = require('query-string');
const bodyParser = require('body-parser');
const { getCookie } = require('./utils/dotcms/utilities');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { isNextInternalFile, logger } = require('./utils');
const dotcms = require('./utils/dotcms');

const formUrlEncodedParser = bodyParser.raw({
    type: 'application/x-www-form-urlencoded',
    limit: '10mb',
    extended: true
});

let nav = null;
let language = {
    options: null,
    current: '',
    set: ()=> {}
}

function getCurrentLanguage(req){
    return  getCookie(req.headers.cookie, 'dotSPALang') || 'en';
}

function dotCMSRequestHandler(req, res) {
    const url = req.path;
    if (dotcms.isPage(url)) {
        return dotcms.getPage(url, getCurrentLanguage(req));
    } else {
        return dotcms.proxyToStaticFile(req, res);
    }
}

app.prepare()
    .then(() => {
        const server = express();

        // Getting navigation from DotCMS
        server.all('*', async (req, res, next) => {
            if (nav === null) {
                try {
                    nav = await dotcms.getNav();
                } catch (error) {
                    nav = [];
                }
            }
            language.options = language.options ? language.options : await dotcms.getLanguages();
            next();
        });

        server.get('*', async (req, res) => {
            req.locals = {};
            req.locals.context = {};

            if (isNextInternalFile(req.path)) {
                return handle(req, res);
            }

            /*
                Trying to render the requested page from DotCMS, if the page exist and have a
                layout:
                
                1. We use NextJS to server side render the page
                2. We use the NextJS page component in /pages/dotcms.js
                3. We pass the page object to that component
            */
            try {
                const pageRender = await dotCMSRequestHandler(req, res);
                if (pageRender) {
                    language.current = getCurrentLanguage(req);
                    app.render(req, res, '/dotcms', { pageRender, nav, language });
                }
            } catch (error) {
                /* 
                If the request to DotCMS fail we have a fallaback chain in place.
            */
                switch (error.statusCode) {
                    /*
                        If the page doesn't have a layout we render the error using next right away.
                    */
                    case dotcms.errors.DOTCMS_NO_LAYOUT:
                        res.statusCode = 406; // Not Acceptable
                        error.statusCode = res.statusCode;

                        app.renderError(null, req, res, req.path, {
                            error
                        });
                        break;
                    /*
                        But if the request to DotCMS fail because the instance is down or auth 
                        wasn't sucessufl, we try to render the page using next static page feature.

                        If the page exist in next all good but if not next will render a 404.

                        Also we are setting in dev mode a dotcmsStatus message that we will render
                        in all the pages just in edit mode to want developers that something is up
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
                        app.render(req, res, req.path);
                }
            }
        });

        /*
            DotCMS Edit Mode Anywhere Plugin works by sending a POST request to the configured
            server with the page object in the body, so:

            1. We parse the body
            2. Set absolute url to the assets for correct rendering inside DotCMS
            3. Render the page using nextjs api
        */
        server.post('*', formUrlEncodedParser, async (req, res) => {
            logger('DOTCMS EDIT MODE');
            const page = JSON.parse(querystring.parse(req.body.toString()).dotPageData).entity;
            const pageRender = await dotcms.transformPage(page);
            app.setAssetPrefix(process.env.PUBLIC_URL);
            app.render(req, res, '/dotcms', { pageRender, nav, isBeingEditFromDotCMS: true });
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log(`> Ready on ${process.env.PUBLIC_URL}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
