import React, { useEffect } from 'react';
import Head from 'next/head';

import DotCMSPage from '../components/layout/DotCMSPage';
import Layout from '../components/layout/Layout';

export const PageContext = React.createContext({
    isEditMode: false,
    nav: [],
    languages: {},
    currentLang: () => {}
});

/*
    This component will receive the page object from DotCMS and render the page using the layout
    object which contain rows > columns > containers > contentlets, forms and/or widgets.
*/
function Home(props) {
    const { nav, pageRender, languages, currentLang } = props;
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
                import('dotcms-ema-elements/loader').then(module => {
                    module.applyPolyfills().then(() => {
                        module.defineCustomElements(window);
                    });
                });
            }
        }
    });

    return (
        <PageContext.Provider value={{ isEditMode, nav, languages, currentLang }}>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://unpkg.com/current-device/umd/current-device.min.js"></script>
                <title>{`${pageRender.page.title} | ${pageRender.page.friendlyName}`}</title>
            </Head>
            <Layout {...pageRender.layout}>
                <DotCMSPage body={pageRender.layout.body} />
            </Layout>
        </PageContext.Provider>
    );
}

export default Home;
