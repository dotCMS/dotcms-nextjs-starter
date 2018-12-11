import fs from 'fs';
import http from 'http';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../src/App';



const server = http.createServer((request, response) => {
    const app = renderToString(<App data={{ hello: 'world' }} />);
    const indexFile = path.resolve('./public/index.html');

    fs.readFile(indexFile, 'utf8', (err, data) => {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`));
        response.end();
    });
});

server.listen(5000, () => {
    console.log('Server running http://localhost:5000');
});