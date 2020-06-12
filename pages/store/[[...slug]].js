import { getPage, getNav } from '../../config/dotcms';
import Layout from '../../components/layout/Layout';
import PageContext from '../../contexts/PageContext';
import DotCMSPage from '../../components/layout/DotCMSPage';
import { getPageList } from '../../utilities/dotcms';

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
    const res = await getPageList();
    const paths = res.reduce((acc, url) => {
        acc = [
            ...acc,
            {
                params: {
                    slug: url
                        ?.split('/')
                        .filter(Boolean)
                        .filter((item) => {
                            return item !== 'index' && item !== 'store';
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
