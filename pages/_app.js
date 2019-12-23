import App from 'next/app';
import Error from '../components/layout/Error';
import DotCMS from '../pages/dotcms';
import React, { useRef, useEffect, useState } from 'react';
import dotcms from '../utils/dotcms';

import { setCookie, getCookie, LANG_COOKIE_NAME } from '../utils/dotcms/utilities';

export const PageContext = React.createContext({
    isEditMode: false,
    nav: [],
    language: {}
});

const { loggerLog } = require('../utils');

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

class MyApp extends App {
    static async getInitialProps(appContext) {
        const appProps = await App.getInitialProps(appContext);
        const nav = await dotcms.getNav();
        return { ...appProps, nav };
    }

    render() {
        const {
            Component,
            router: { query },
            pageProps,
            nav
        } = this.props;

        const language = {
            current: process.browser ? getCookie(document.cookie, LANG_COOKIE_NAME) : ''
        };

        const error = pageProps.error;
        const { pageRender } = query;
        const isEditMode = pageRender ? pageRender.viewAs.mode === 'EDIT_MODE' : false;

        const FinalComponentToRender = () =>
            error ? (
                <Component {...error} />
            ) : (
                <Component pageRender={pageProps.pageRender} language={language}></Component>
            );

        return (
            <PageContext.Provider value={{ isEditMode, nav: nav || [], language }}>
                <style global jsx>
                    {`
                        @import url('/application/themes/travel/css/styles.dotsass');
                        @import url('//fonts.googleapis.com/css?family=Oswald:500,600,700%7CRoboto:300,300i,700%7CCondiment%7CDella+Respira');
                    `}
                </style>
                {/* <DotCMSStatus status={query.dotcmsStatus} /> */}
                <FinalComponentToRender />
            </PageContext.Provider>
        );
    }
}

export default MyApp;
