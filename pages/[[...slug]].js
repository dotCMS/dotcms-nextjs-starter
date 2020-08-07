import Head from 'next/head';
import DotCMSPage from '../components/dotcms/layout/DotCMSPage';
import getPageList from '../utilities/dotcms/getPageList';
import getPageUrl from '../utilities/dotcms/getPageUrl';
import { getPage, getNav, getPathsArray, getLanguagesProps } from '../utilities/dotcms';

export default function Page({ pageRender, nav, languageProps }) {
    const { page } = pageRender || {};

    return (
        <>
            <Head>
                <title>dotCMS | {page?.seoTitle || page?.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content={
                        page?.seodescription ||
                        'This is an example of a meta description. This will often show up in search results.'
                    }
                />
            </Head>
            <DotCMSPage pageRender={pageRender} nav={nav} languageProps={languageProps} />
        </>
    );
}

export const getStaticPaths = async () => {
    // Fetch pages from DotCMS and get all the urls in an array of strings, ex:
    // ['/destinations/index', '/store/index', '/store/category/snow'];

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
    try {
        const {
            params: { slug }
        } = context;

        const [languageIso] = slug || [];
        const { languageId, hasLanguages, ...rest } = await getLanguagesProps(languageIso);

        const url = await getPageUrl(slug, hasLanguages);

        // Fetch the page object from DotCMS Page API
        let pageRender = await getPage(url, languageId);

        // Fetch the navigation from DotCMS Navigation API
        const nav = await getNav('4');

        return {
            props: {
                pageRender,
                nav,
                languageProps: { languageId, hasLanguages, ...rest }
            },
            revalidate: 1
        };
    } catch (error) {
        throw error
    }
};
