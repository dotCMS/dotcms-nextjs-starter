import DotCMSPage from '../components/layout/DotCMSPage';
import Error from '../components/layout/Error';
import { getPage, getNav, getPathsArray } from '../utilities/dotcms';
import getPageList from '../utilities/dotcms/getPageList';
export default function ({ pageRender, nav, error}) {
    if(error) {
        return <Error statusCode={error.statusCode} message={error.message} />;
    }
    return <DotCMSPage pageRender={pageRender} nav={nav} />;
}

export const getStaticPaths = async () => {
    const pageList = await getPageList(); // API call
    const paths = getPathsArray(pageList);

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const { params: { slug } } = context;
    try {
        let url = `/${slug.join('/')}`
        const pageRender = await getPage(url); // API call
        const nav = await getNav('4'); // API call

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
        }
    }
}