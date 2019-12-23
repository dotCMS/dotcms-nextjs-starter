import React, { useEffect } from 'react';
import Head from 'next/head';

import DotCMSPage from '../components/layout/DotCMSPage';
import Layout from '../components/layout/Layout';
import { getPage } from '../utils/dotcms';
import { getCookie, LANG_COOKIE_NAME } from '../utils/dotcms/utilities';

if (process.browser && !window.dotcmsFields) {
    import('dotcms-field-elements/dist/loader').then((module) => {
        module.defineCustomElements(window);
    });
}

/*
    This component will receive the page object from DotCMS and render the page using the layout
    object which contain rows > columns > containers > contentlets, forms and/or widgets.
*/
function DotCMS(pageRender) {
    const isEditMode = pageRender.viewAs.mode === 'EDIT_MODE';

    useEffect(() => {
        if (process.browser) {
            /*
                To make DotCMS edit mode works we need information about containers and contentlets.
                DotCMS reads that information from data-attr in the HTML, to keep things simeple
                we create a library with two Web Components to pass that data.

                Web Component library: https://www.npmjs.com/package/dotcms-ema-elements
                More information in the component: components/layout/Container.js

                We are only importing and unsing this Web Components in EDIT_MODE.
            */
            if (isEditMode) {
                import('dotcms-ema-elements/loader').then((module) => {
                    module.applyPolyfills().then(() => {
                        module.defineCustomElements(window);
                    });
                });
            }
        }
    });

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://unpkg.com/current-device/umd/current-device.min.js"></script>
                <title>{`${pageRender.page.title} | ${pageRender.page.friendlyName}`}</title>
            </Head>
            <Layout {...pageRender.layout}>
                <DotCMSPage body={pageRender.layout.body} />
            </Layout>
        </>
    );
}

DotCMS.getInitialProps = async ({ asPath, req }) => {
    const cookie = req ? req.headers.cookie : document.cookie;
    const lang = getCookie(cookie, LANG_COOKIE_NAME);
    const pageRender = await getPage(asPath, lang).catch((e) => {
        console.log('ERROR', e);
        return {};
    });

    return { pageRender };
};

export default DotCMS;
