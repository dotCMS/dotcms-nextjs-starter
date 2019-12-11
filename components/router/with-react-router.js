import React from 'react';
import { BrowserRouter } from 'react-router-dom';
const isServer = typeof window === 'undefined';
import dotcms from '../../utils/dotcms';

export default (App) => {
    let nav = [];
    return class AppWithReactRouter extends React.Component {
        static async getInitialProps(appContext) {
            const { pageProps } = await App.getInitialProps(appContext);

            /*
                If we fallback to nexjs to render a page and throws an error in the response,
                we catche it here and pass it to the props of the _app.js
            */
            let nextJsRenderError;
            if (appContext.ctx.res.statusCode > 200) {
                nextJsRenderError = {
                    statusCode: appContext.ctx.res.statusCode
                };
            }

            const {
                ctx: {
                    req: { originalUrl, locals = {} }
                }
            } = appContext;

            if (!nav.length) {
                try {
                    nav = [
                        {
                            children: [],
                            exact: true,
                            hash: 0,
                            href: '/',
                            target: '_self',
                            title: 'Home'
                        }
                    ].concat(await dotcms.getNav());
                } catch (error) {
                    nav = [];
                }
            }

            return {
                originalUrl,
                context: locals.context || {},
                nav,
                nextJsRenderError,
                pageProps
            };
        }

        render() {
            if (isServer) {
                const { StaticRouter } = require('react-router');
                return (
                    <StaticRouter location={this.props.originalUrl} context={this.props.context}>
                        <App {...this.props} />
                    </StaticRouter>
                );
            }

            return (
                <BrowserRouter>
                    <App {...this.props} />
                </BrowserRouter>
            );
        }
    };
};
