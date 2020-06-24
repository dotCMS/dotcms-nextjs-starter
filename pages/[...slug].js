import DotCMSPage from '../components/layout/DotCMSPage';
import { getPage, getNav, getPageList, filterPaths } from '../utilities/dotcms';
import Error from '../components/layout/Error';

export default function ({ pageRender, nav, error }) {
    if(error) {
        return <Error statusCode={error.statusCode} message={error.message} />;
    }

    return <DotCMSPage pageRender={pageRender} nav={nav} />;
}

export async function getStaticPaths() {
    const res = await getPageList();
    const paths = filterPaths(res);

    return {
        paths,
        fallback: false
    };
}

export const getStaticProps = async ({ params: { slug } }) => {

    try {
        let url = `/${slug.join('/')}`;
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
            props: { error }
        };
    }
};
