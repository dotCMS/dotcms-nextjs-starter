import Layout from '../components/layout/Layout';
import PageContext from '../contexts/PageContext';
import DotCMSPage from '../components/layout/DotCMSPage';
import { useEffect } from 'react';

function DotCMSStaticPage({ pageRender, nav }) {
    useEffect(() => {
        if (process.browser) {
            /*
                To make DotCMS edit mode works we need information about containers and contentlets.
                DotCMS reads that information from data-attr in the HTML, to keep things simeple
                we create a library with two Web Components to pass that data.

                Web Component library: https://www.npmjs.com/package/dotcms-ema-elements
                More information in the component: components/layout/Container.js
            */
            import('dotcms-ema-elements/loader').then((module) => {
                module.applyPolyfills().then(() => {
                    module.defineCustomElements(window);
                });
            });
        }
    });

    return (
        <PageContext.Provider
            value={{
                isEditMode: true,
                nav: nav || [],
                language: {
                    current: '1', // needs to make this dynamic, check _app.js
                    set: () => {}
                }
            }}
        >
            {pageRender?.layout ? (
                <Layout {...pageRender?.layout}>
                    <DotCMSPage pageRender={pageRender} />
                </Layout>
            ) : (
                <h2>{pageRender?.page?.title}</h2>
            )}
        </PageContext.Provider>
    );
}

export async function getServerSideProps(context) {
    const { nav, pageRender } = context.query;
    return {
        props: {
            pageRender,
            nav
        }
    };
}

export default DotCMSStaticPage;
