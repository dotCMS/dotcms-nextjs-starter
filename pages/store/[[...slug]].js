import { getPage, getNav } from '../../config/dotcms';
import Layout from '../../components/layout/Layout';
import PageContext from '../../contexts/PageContext';
import DotCMSPage from '../../components/layout/DotCMSPage';

function DotCMSStaticPage({ pageRender, nav }) {
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
    const NOT_BUILD_THIS_PAGES = ['/store/product-line', '/store/product-detail', '/store/cart'];

    const PAGES_QUERY = {
        query: `{ 
            search(query: "+(urlmap:/store/* OR (basetype:5 AND path:/store/*))") {
                urlMap
                ... on htmlpageasset {
                    url
                }
            }
        }`
    };

    let data = await fetch(`${process.env.DOTCMS_HOST}/api/v1/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        },
        body: JSON.stringify(PAGES_QUERY)
    });

    ({ data } = await data.json());

    const paths = data.search
        .filter(({ urlMap, url }) => urlMap || url)
        .map(({ urlMap, url }) => urlMap || url)
        .filter((url) => !NOT_BUILD_THIS_PAGES.includes(url))
        .reduce((acc, url) => {
            acc = [
                ...acc,
                {
                    params: {
                        slug: url
                            ?.split('/')
                            .filter(Boolean)
                            .filter((item) => {
                                return item !== 'index'  && item !== "store";
                            })
                    }
                }
            ];
            return acc;
        }, []);

    paths.push({ params: { slug: [] } });

    return {
        paths,
        fallback: false
    };
}

export const getStaticProps = async ({ params: { slug } }) => {
    try {
 
        let url = slug
            ? slug[0] === 'products'
                ? `/store/${slug.join('/')}`
                : `/${slug.join('/')}`
            : '/store';

        const pageRender = await getPage(url);
        const nav = await getNav('4');
        
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
        };
    }
};

export default DotCMSStaticPage;
