import App from 'next/app';
import React, { useRef, useEffect, useState } from 'react';
import withReactRouter from '../components/router/with-react-router';
import { Route, Switch } from 'react-router-dom';
import Error from '../components/layout/Error';
import dotcms from '../utils/dotcms';

const { logger } = require('../utils');

function DotCMSStatus({ status }) {
    return (
        <>
            <style jsx>
                {`
                    p {
                        background-color: var(--black);
                        color: var(--white);
                        font-size: 0.75em;
                        padding: 0.5rem 1rem;
                        position: fixed;
                        right: 0.5rem;
                        top: 0.5rem;
                    }
                `}
            </style>
            {status ? <p>{status}</p> : null}
        </>
    );
}

function RoutedComponent({ Component, pageRender, nav, isBeingEditFromDotCMS, location: { pathname } }) {
    const isFirstRun = useRef(true);
    const [requestedPage, setRequestedPage] = useState(null);
    const [clientRequestError, setClientRequestError] = useState(null);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (isBeingEditFromDotCMS) {
            dotcms.emitRemoteRenderEdit(pathname);
            return;
        }

        async function fetchDotCMSPage() {
            logger('DOTCMS CLIENT PAGE REQUEST', pathname);

            try {
                const requestedPage = await dotcms.getPage(pathname);
                setRequestedPage(requestedPage);

                /*
                    We were getting a warning from next router when we hit the back button.

                    Since we're usig react-router the state of the window.history is not
                    getting updated as next router expect so we're getting this error:
                    https://err.sh/zeit/next.js/popstate-state-empty

                    This makes that when user hits the back button the browser hits the
                    node/express to render the page like it was first load.

                    This is to fix that until next give us a better option.
                */
                history.replaceState(
                    {
                        as: pathname,
                        url: pathname
                    },
                    null,
                    pathname
                );
            } catch (e) {
                setClientRequestError(e);
            }
        }
        fetchDotCMSPage();
    }, [pathname]);

    if (clientRequestError) {
        const { statusCode, message } = clientRequestError;
        return <Error message={message} statusCode={statusCode} />;
    }

    return <Component pageRender={requestedPage || pageRender} nav={nav} />;
}

class MyApp extends App {
    render() {
        const {
            Component,
            router: { query },
            nextJsRenderError
        } = this.props;

        /*
            query.error: is the error we get from DotCMS instance
            nextJsRenderError: is the error we get if we fallback to render a page using NextJS
            and it fail, normally it will be a 404.
        */
        const error = query.error || nextJsRenderError;

        const FinalComponentToRender = () =>
            error ? (
                <Component {...error} />
            ) : (
                <Switch>
                    <Route
                        component={routerProps => {
                            return (
                                <>
                                    <RoutedComponent
                                        Component={Component}
                                        pageRender={query.pageRender}
                                        nav={query.nav}
                                        {...routerProps}
                                    ></RoutedComponent>
                                </>
                            );
                        }}
                    />
                </Switch>
            );

        return (
            <>
                <style global jsx>
                    {`
                        @import url('/application/themes/travel/css/styles.dotsass');
                        @import url('//fonts.googleapis.com/css?family=Oswald:500,600,700%7CRoboto:300,300i,700%7CCondiment%7CDella+Respira');
                    `}
                </style>
                <DotCMSStatus status={query.dotcmsStatus} />
                <FinalComponentToRender />
            </>
        );
    }
}

export default withReactRouter(MyApp);
