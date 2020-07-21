import DotCMSPage from '../components/layout/DotCMSPage';
import Error from '../components/layout/Error';
import { getPage, getNav, getPathsArray } from '../utilities/dotcms';
import getPageList from '../utilities/dotcms/getPageList';

export default function Page({ pageRender, nav, error }) {
    if (error) {
        return <Error statusCode={error.statusCode} message={error.message} />;
    }
    return <DotCMSPage pageRender={pageRender} nav={nav} />;
}

export const getStaticPaths = async () => {
    // Fetch pages from DotCMS and get all the urls in an array of strings, ex:
    // ['/destinations/index', '/store/index', '/store/category/snow']
    const pageList = await getPageList();

    // Using the array of urls return a collection of paths, ex:
    // [
    //     { params: { slug: '/destinations' } },
    //     { params: { slug: '/store' } }
    //     { params: { slug: '/store/category/snow' } }
    // ]
    const paths = getPathsArray(pageList);

    // Then Next.js will statically generate /destinations, /store and /store/category/snow at build time using the page component in pages/[...slug].js.
    return {
        paths,
        fallback: true
    };
};

export const getStaticProps = async (context) => {
    const {
        params: { slug }
    } = context;
    try {
        let url = `/${slug.join('/')}`;
        // Fetch the page object from DotCMS Page API
        const pageRender = await getPage(url);
        // Fetch the navigation from DotCMS Navigation API
        const nav = await getNav('4');

        return {
            props: {
                pageRender,
                nav
            },
            revalidate: 1
        };
    } catch (error) {
        return {
            props: { error }
        };
    }
};
