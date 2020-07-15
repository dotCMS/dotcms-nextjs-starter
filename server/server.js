const express = require('express');
const next = require('next');
const querystring = require('query-string');
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const DotCMSEmaMiddleware = require('./middleware/ema.middleware')
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

        server.post('*', formUrlEncodedParser, DotCMSEmaMiddleware(app));

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
