import DotCMSPage from '../../components/layout/DotCMSPage';
import { getPage, getNav } from '../../config/dotcms';
import { getPageList } from '../../utilities/dotcms';

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

export default function ({ pageRender, nav }) {
    return <DotCMSPage pageRender={pageRender} nav={nav} />;
}
