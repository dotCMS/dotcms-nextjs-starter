import DotCMSPage from '../components/dotcms/layout/DotCMSPage';
import { useEffect } from 'react';

import { parseBody } from 'next/dist/next-server/server/api-utils';

import { getNav, getLanguagesProps } from '../utilities/dotcms';
import transformPage from '../utilities/dotcms/transformPage';

function DotCMSStaticPage({ pageRender, nav, languageProps }) {
    useEffect(() => {
        if (process.browser) {
            /*
                To make DotCMS edit mode works we need information about containers and contentlets.
                DotCMS reads that information from data-attr in the HTML, to keep things simeple
                we create a library with two Web Components to pass that data.

                Web Component library: https://www.npmjs.com/package/dotcms-ema-elements
                More information in the component: components/dotcms/layout/Container.js
            */
            import('dotcms-ema-elements/loader').then((module) => {
                module.applyPolyfills().then(() => {
                    module.defineCustomElements(window);
                });
            });
        }
    });


    return (

        <DotCMSPage
            pageRender={pageRender}
            nav={nav}
            languageProps={languageProps}
            isEditMode={true}
        />
    );
}

export async function getServerSideProps({ req, res }) {
    const body = await parseBody(req, '1mb');
    const page = JSON.parse(body.dotPageData).entity;
    const pageRender = await transformPage(page);
    const nav = await getNav(4);
    const { languageId, hasLanguages, ...rest } = await getLanguagesProps();
    res.set('Access-Control-Allow-Origin', '*')


    return {
        props: {
            pageRender,
            nav,
            languageProps: { languageId, hasLanguages, ...rest }
        }
    };
}

export default DotCMSStaticPage;
