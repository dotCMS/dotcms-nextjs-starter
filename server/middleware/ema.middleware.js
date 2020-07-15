const { loggerLog } = require('../../utilities/logger');
const transformPage = require('../../utilities/dotcms/transformPage');
const { getNav } = require('../../utilities/dotcms');
const querystring = require('query-string');

const DotCMSEmaMiddleware = (app) => {
    return async function (req, res, next) {
        /*
            DotCMS Edit Mode Anywhere Plugin works by sending a POST request to the configured
            server with the page object in the body, so:

            1. We parse the body
            2. Set absolute url to the assets for correct rendering inside DotCMS
            3. Render the page using nextjs api
        */

        loggerLog('DOTCMS EDIT MODE');
        const page = JSON.parse(querystring.parse(req.body.toString()).dotPageData).entity;
        const pageRender = await transformPage(page);
        const nav = await getNav(4);
        app.setAssetPrefix(`${process.env.NEXT_PUBLIC_DEPLOY_URL}`);
        app.render(req, res, '/ema', { pageRender, nav });
        next();
    };
};


module.exports = DotCMSEmaMiddleware;
