import { Head } from 'next/head'

import DotCMSPage from '../components/dotcms/layout/DotCMSPage';
import { useEffect } from 'react';

import { parseBody } from 'next/dist/next-server/server/api-utils';

import { getNav, getLanguagesProps } from '../utilities/dotcms';
import transformPage from '../utilities/dotcms/transformPage';

function DotCMSStaticPage(props) {
    const { pageRender, nav, languageProps } = props;

    if (!pageRender) {
        return process.env.NODE_ENV === 'development' ? <>
            <h1>Edit Mode Anywhere</h1>
            <p>This page is only used for Edit Mode Anywhere: <a href="https://dotcms.com/blog/post/headless-cms-for-marketers-deep-dive-into-edit-mode-anywhere#:~:text=The%20eventual%20ai[…]0(IoT)%20capable%20device%2C">More info</a></p>
        </> : <h1>Error 404</h1>
    }

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

// DotCMS will POST this page with the page object in the body.
export async function getServerSideProps({ req, res }) {
    try {
        // We get the body
        const body = await parseBody(req, '1mb');
        const page = JSON.parse(body.dotPageData).entity;

        // Transform the page object to add the contentlets inside the layout property (easier to render components)
        const pageRender = await transformPage(page);

        // Optional but better performance: we get the navigation and language server side.
        const nav = await getNav(4);
        const { languageId, hasLanguages, ...rest } = await getLanguagesProps();

        // Return the props to be shown in the component
        return {
            props: {
                pageRender,
                nav,
                languageProps: { languageId, hasLanguages, ...rest }
            }
        };
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }

}

export default DotCMSStaticPage;
