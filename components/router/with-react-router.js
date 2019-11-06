import React from 'react';
import { BrowserRouter } from 'react-router-dom';
const isServer = typeof window === 'undefined';

export default App => {
    return class AppWithReactRouter extends React.Component {
        static async getInitialProps(appContext) {
            let nextJsRenderError;
            /*
                If we fallback to nexjs to render a page and throws an error in the response,
                we catche it here and pass it to the props of the _app.js
            */
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

            return {
                originalUrl,
                context: locals.context || {},
                nextJsRenderError
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
