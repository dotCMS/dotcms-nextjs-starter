import React from 'react';
import App from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';
import { GlobalStyle } from '../styles/global';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Layout>
                <Head>
                    <title>dotCMS Store</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head>
                <GlobalStyle />
                <Component {...pageProps} />
            </Layout>
        );
    }
}
