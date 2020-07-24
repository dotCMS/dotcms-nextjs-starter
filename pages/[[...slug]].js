import DotCMSPage from '../components/layout/DotCMSPage';
import Error from '../components/layout/Error';
import { getPage, getNav, getPathsArray, getLanguages } from '../utilities/dotcms';
import getPageList from '../utilities/dotcms/getPageList';
const dotCMSApi = require('../config/dotcmsApi');

export default function Page({ pageRender, nav, error, languages }) {
    if (error) {
        return <Error statusCode={error.statusCode} message={error.message} />;
    }
    return <DotCMSPage pageRender={pageRender} nav={nav} languages={languages} />;
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
    const {
        params: { slug }
    } = context;
    try {
        // Fetch list of languages supported in the DotCMS instance so we can inject the data into the static pages 
        // and map to a clean array of ISO compatible lang codes. 
        let languages = await getLanguages();
        languages = languages.map((language) => language.languageCode);

        const [head, ...tail] = slug || [];

        let hasLanguages = languages
            .filter((language) => language !== 'en')
            .includes(head);

        let url = slug ? (hasLanguages ? `/${tail.join('/')}` : `/${slug.join('/')}`) : '/index';
        // Fetch the page object from DotCMS Page API
        const pageRender = await getPage(url, head);

        // Fetch the navigation from DotCMS Navigation API
        const nav = await getNav('4');

        return {
            props: {
                pageRender,
                nav,
                languages: {languagesList: languages, selectedLanguage: hasLanguages && head},
            },
            revalidate: 1
        };
    } catch (error) {
        return {
            props: { error }
        };
    }
};
