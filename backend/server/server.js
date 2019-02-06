import fs from 'fs';
import http from 'http';
import path from 'path';
import url from 'url';
import { parse } from 'querystring';
import Loadable from 'react-loadable';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import DotCMSApi from '../../src/libs/dotcms.api';

import App from '../../src/App';

const STATIC_FOLDER = './build';

const isThisAPage = (pathname) => {
    const ext = path.parse(pathname).ext;
    return (!pathname.startsWith('/api') && ext.length === 0) || ext === '.html';
};

const getScript = (payload) => {
    const { rendered, ...page } = payload.page;

    if (payload) {
        return `
        <script type="${mimeType['.js']}">
            var dotcmsPage = ${JSON.stringify({
                layout: payload.layout,
                viewAs: payload.viewAs,
                page: page
            })}
        </script>`;
    } else {
        return '';
    }
};

const getMainComponent = (url, payload) => {
    const modules = [];
    const context = {};
    return (
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
            <StaticRouter location={url} context={context}>
                <App {...payload.layout} {...payload.viewAs} {...payload.page} />
            </StaticRouter>
        </Loadable.Capture>
    );
};

// maps file extention to MIME types
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
};

const server = http.createServer((request, response) => {
    if (request.method === 'POST' && !request.url.startsWith('/api')) {
        var postData = '';

        // Get all post data when receive data event.
        request.on('data', function(chunk) {
            postData += chunk;
        });

        // When all request post data has been received.
        request.on('end', function() {
            // Parse the post data and get client sent username and password.
            // let postDataObject = JSON.parse(postData);
            const page = DotCMSApi.page.translate(JSON.parse(parse(postData).dotPageData).entity);

            fs.readFile(`${STATIC_FOLDER}/index.html`, 'utf8', (err, data) => {
                const app = renderToString(getMainComponent(request.url, page));
                data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
                data = data.replace('<div id="script"></div>', getScript(page));

                response.setHeader('Content-type', mimeType['.html'] || 'text/plain');
                response.end(data);
            });
        });
    } else {
        const parsedUrl = url.parse(request.url);

        // extract URL path
        // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
        // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
        // by limiting the path to current directory only
        const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');

        if (isThisAPage(sanitizePath)) {
            fs.readFile(`${STATIC_FOLDER}/index.html`, 'utf8', (err, data) => {
                DotCMSApi.page
                    .get({
                        pathname: sanitizePath
                    })
                    .then((payload) => {
                        const app = renderToString(getMainComponent(request.url, payload));
                        data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
                        data = data.replace('<div id="script"></div>', getScript(payload));

                        response.setHeader('Content-type', mimeType['.html'] || 'text/plain');
                        response.end(data);
                    });
            });
        } else {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Credentials', 'true');
            response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
            response.setHeader(
                'Access-Control-Allow-Headers',
                'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            );

            const pathname = path.join(STATIC_FOLDER, sanitizePath);

            fs.exists(pathname, (exist) => {
                if (!exist || request.url.startsWith('/api')) {
                    // if the file is not found un build folder, proxy to dotcms instance
                    let proxy = http.request(
                        {
                            hostname: 'localhost',
                            port: 8080,
                            path: request.url,
                            method: request.method,
                            headers: request.headers,
                            body: request.body
                        },
                        (res) => {
                            res.pipe(
                                response,
                                {
                                    end: true
                                }
                            );
                        }
                    );

                    request.pipe(
                        proxy,
                        {
                            end: true
                        }
                    );
                    return;
                }

                // read file from file system (build folder)
                fs.readFile(pathname, (err, data) => {
                    if (err) {
                        response.statusCode = 500;
                        response.end(`Error getting the file: ${err}.`);
                    } else {
                        const parsedPath = path.parse(pathname);

                        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                        const ext = parsedPath.ext;

                        // if the file is found, set Content-type and send data
                        response.setHeader('Content-type', mimeType[ext] || 'text/plain');
                        response.end(data);
                    }
                });
            });
        }
    }
});

// We tell React Loadable to load all required assets and start listening.
Loadable.preloadAll().then(() => {
    server.listen(5000, (err) => {
        console.log('Server running http://localhost:5000');
    });
});
