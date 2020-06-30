import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { GlobalStyle } from '../styles/global';
import Router from 'next/router';
import NProgress from 'nprogress';
import { emitRemoteRenderEdit } from '../utilities/dotcms';

// Binding events.
Router.events.on('routeChangeStart', (url) => {
    /*
        To make DotCMS edit mode internal navigation works we need to emit an event,
        we have a method in our library to do this.
    */
    emitRemoteRenderEdit(url);
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                    <title>dotCMS Store</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta
                        name="description"
                        content="This is an example of a meta description. This will often show up in search results."
                    />
                </Head>
                <GlobalStyle />
                <Component {...pageProps} />
            </>
        );
    }
}
