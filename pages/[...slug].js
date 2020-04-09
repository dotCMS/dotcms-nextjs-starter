import Head from 'next/head';

import DotCMSPage from '../components/layout/DotCMSPage';
import Layout from '../components/layout/Layout';
import { getPage, getNav, getAllPagesContentlets } from '../utils/dotcms';
import PageContext from '../context/PageContext';
import GlobalStyles from '../components/GlobalStyles';
import BlogDetail from '../components/Blog/BlogDetail';

function TestingPage({ pageRender, nav }) {
    const isEditMode = pageRender?.viewAs?.mode === 'EDIT_MODE';

    return (
        <PageContext.Provider
            value={{
                isEditMode,
                nav: nav || [],
                language: {
                    current: '1', // needs to make this dynamic, check _app.js
                    set: () => {}
                }
            }}
        >
            <GlobalStyles />
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://unpkg.com/current-device/umd/current-device.min.js"></script>
                <title>{`${pageRender?.page?.title} | ${pageRender?.page?.friendlyName}`}</title>
                
            </Head>
            {pageRender?.layout ? (
                <Layout {...pageRender?.layout}>
                    {pageRender?.urlContentMap?.contentType === 'Blog' ? (
                        <BlogDetail {...pageRender.urlContentMap} />
                    ) : (
                        <DotCMSPage body={pageRender?.layout?.body} />
                    )}
                </Layout>
            ) : (
                <h2>{pageRender?.page?.title}</h2>
            )}
        </PageContext.Provider>
    );
}

export async function getStaticProps({ params }) {
    try {
        const url = `/${params.slug.join('/')}`;
        const pageRender = await getPage(url);
        const nav = await getNav();

        return {
            props: {
                pageRender,
                nav
            }
        };
    } catch ({ message }) {
        return {
            props: {
                pageRender: {
                    page: {
                        title: message
                    }
                }
            }
        };
    }
}

export async function getStaticPaths() {
    let data = await getAllPagesContentlets().then((pages) => {
        return pages.map(({ URL_MAP_FOR_CONTENT, path }) => {
            const finalPath = URL_MAP_FOR_CONTENT || path;
            const slug = finalPath.split('/').filter((partial) => !!partial);

            if (!slug.includes('index')) {
                slug.push('index');
            }

            return {
                params: {
                    slug
                }
            };
        });
    });
    return {
        paths: data,
        fallback: true
    };
}

export default TestingPage;
