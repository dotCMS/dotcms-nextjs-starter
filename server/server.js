import fs from 'fs';
import http from 'http';
import path from 'path';
import url from 'url';

import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../src/App';

const STATIC_FOLDER = './build';

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
    const parsedUrl = url.parse(request.url);

    // extract URL path
    // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
    // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
    // by limiting the path to current directory only
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(STATIC_FOLDER, sanitizePath);

    fs.exists(pathname, exist => {
        if (!exist) {
            // if the file is not found, return 404
            request.statusCode = 404;
            request.end(`File ${pathname} not found!`);
            return;
        }

        // if is a directory, then look for index.html
        if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index.html';
        }

        // read file from file system
        fs.readFile(pathname, 'utf8', (err, data) => {
            if (err) {
                response.statusCode = 500;
                response.end(`Error getting the file: ${err}.`);
            } else {
                const parsedPath = path.parse(pathname);

                if (parsedPath.base === 'index.html') {
                    const app = renderToString(<App data={{ hello: 'world' }} />);
                    data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
                }

                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const ext = parsedPath.ext;

                // if the file is found, set Content-type and send data
                response.setHeader('Content-type', mimeType[ext] || 'text/plain');
                response.end(data);
            }
        });
    });
});

server.listen(5000, err => {
    console.log('Server running http://localhost:5000');
});
