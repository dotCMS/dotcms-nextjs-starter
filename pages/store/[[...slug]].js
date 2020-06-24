import DotCMSPage from '../../components/layout/DotCMSPage';
import { getPage, getNav, getPageList } from '../../utilities/dotcms';
import Error from '../../components/layout/Error';

export default function ({ pageRender, nav, error }) {
    if (error) {
        return <Error statusCode={error.statusCode} message={error.message} />;
    }
    return <DotCMSPage pageRender={pageRender} nav={nav} />;
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

        const pageRender = await getPage('/store/test');
        console.log('pageRender', pageRender);

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
            props: { error }
        };
    }
};
