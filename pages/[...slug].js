import Head from 'next/head';
import { getPage, getNav, getAllPagesContentlets } from '../utils/dotcms';
import Layout from '../components/layout/Layout';
import PageContext from '../context/PageContext';
import DotCMSPage from '../components/layout/DotCMSPage';

function DotCMSStaticPage({ pageRender, nav }) {

    console.log({ nav, pageRender });

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

export async function getStaticPaths() {

    const PAGES_QUERY = {
        query:
            '{ search(query: "+(urlmap:/store/* OR (basetype:5 AND path:/store/*))") { urlMap } }'
    };

    let data = await fetch(`${process.env.DOTCMS_HOST}/api/v1/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        },
        body: JSON.stringify(PAGES_QUERY)
    });

    ({data} = await data.json());

    const paths = data.search
        .filter(({ urlMap }) => Boolean(urlMap))
        .reduce((acc, curr) => {
            acc = [...acc, { params: { slug: curr.urlMap?.split('/').filter(Boolean) } }];
            return acc;
        }, []);

    return {
        paths,
        fallback: true
    };
}

export const getStaticProps = async ({params}) => {
   try {
        const url = `/${params.slug.filter((item) => item !== 'index').join('/')}`;
        const pageRender = await getPage(url);
        const nav = await getNav('4', 'store');

        return {
            props: {
                pageRender,
                nav
            },
            unstable_revalidate: 1
        };
   } catch (error) {

    return {
        props: {}
    }
   }
};

export default DotCMSStaticPage;
