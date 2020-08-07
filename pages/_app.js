import React from 'react';
import App from 'next/app';
import { GlobalStyle } from '../styles/global';
import Router from 'next/router';
import NProgress from 'nprogress';

// Binding events.
Router.events.on('routeChangeStart', (url) => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <GlobalStyle />
                <Component {...pageProps} />
            </>
        );
    }
}
