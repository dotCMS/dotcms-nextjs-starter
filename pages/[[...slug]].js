import DotCMSPage from '../components/layout/DotCMSPage';
import Error from '../components/layout/Error';
import { getPage, getNav, getPathsArray, getLanguages, getLanguagesProps } from '../utilities/dotcms';
import getPageList from '../utilities/dotcms/getPageList';
const dotCMSApi = require('../config/dotcmsApi');

export default function Page({ pageRender, nav, error, languageProps }) {
    if (error) {
        return <Error statusCode={error.statusCode} message={error.message} />;
    }
    return <DotCMSPage pageRender={pageRender} nav={nav} languageProps={languageProps} />;
}

export const getStaticPaths = async () => {
    // Fetch pages from DotCMS and get all the urls in an array of strings, ex:
    // ['/destinations/index', '/store/index', '/store/category/snow']
    const pageList = await getPageList();

    // Fetch list of languages supported in the DotCMS instance so we can build our static pages.
    const languages = await getLanguages();

    // Using the array of urls return a collection of paths, ex:
    // [
    //     { params: { slug: '/destinations' } },
    //     { params: { slug: '/store' } }
    //     { params: { slug: '/store/category/snow' } }
    // ]
    const paths = getPathsArray(pageList, languages);

    // Then Next.js will statically generate /destinations, /store and /store/category/snow at build time using the page component in pages/[...slug].js.
    return {
        paths,
        fallback: true
    };
};

export const getStaticProps = async (context) => {
    try {
        const {
            params: { slug }
        } = context;
        // Determine our head and tail
        const [head, ...tail] = slug || [];
        const languageProps = await getLanguagesProps(head);

        // Build our URL
        // if the hasLanguages predicate returns true then join with the tail otherwise join the slugs array
        let url = slug
            ? languageProps.hasLanguages
                ? `/${tail.join('/')}`
                : `/${slug.join('/')}`
            : '/index';

        // Fetch the page object from DotCMS Page API
        const pageRender = await getPage(url, languageProps.languageId);

        // Fetch the navigation from DotCMS Navigation API
        const nav = await getNav('4');

        return {
            props: {
                pageRender,
                nav,
                languageProps
            },
            revalidate: 1
        };
    } catch(error) {
        return { 
            props: {
                error
            }
         }
    }
};
