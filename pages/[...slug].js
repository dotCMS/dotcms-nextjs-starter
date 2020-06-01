import Head from 'next/head';
import { getPage, getNav, getAllPagesContentlets } from '../utils/dotcms';
import Layout from '../components/layout/Layout';
import PageContext from '../context/PageContext';
import DotCMSPage from '../components/layout/DotCMSPage';
import Banner from '../components/content-types/Banner';

function DotCMSStaticPage({ pageRender }) {
    console.log(pageRender, 'something')
    const isEditMode = pageRender?.viewAs?.mode === 'EDIT_MODE';
    return (
        <PageContext.Provider
            value={{
                isEditMode,
                nav: [],
                language: {
                    current: '1', // needs to make this dynamic, check _app.js
                    set: () => {}
                }
            }}
        >
            {pageRender?.layout ? (
                <Layout {...pageRender?.layout}>
                    <DotCMSPage
                        body={pageRender?.layout?.body}
                    />
                </Layout>
            ) : (
                <h2>{pageRender?.page?.title}</h2>
            )}
        </PageContext.Provider>
    );
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
    console.log({ data: JSON.stringify(data) });
    return {
        paths: data,
        fallback: true
    };
}

export const getStaticProps = async ({params}) => {
    const url = `/${params.slug.filter((item) => item !== 'index').join('/')}`;
    const pageRender = await getPage(url);

    console.log({ pageRender });

    return {
        props: {
            pageRender
        },
        unstable_revalidate: 1
    };
};



export default DotCMSStaticPage;
