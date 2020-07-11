import React from 'react';
import DotCMSPage from '../../../components/layout/DotCMSPage';
import { getPage, getNav, getCategoryPathsArray } from '../../../utilities/dotcms';
import Error from '../../../components/layout/Error';

export default function ({ pageRender, nav, error }) {
    if (error) {
        return <Error statusCode={error.statusCode} message={error.message} />;
    }
    return <DotCMSPage pageRender={pageRender} nav={nav} />;
}

export const getStaticPaths = async () => {
    const nav = await getNav('4');
    const [storeNav] = nav.filter((nav) => nav.href === '/Store' || nav.href === '/store');
    const paths = getCategoryPathsArray(storeNav);

    return {
        paths,
        fallback: true
    };
};

export const getStaticProps = async ({ params: { slug } }) => {
    try {
        const [category] = slug.split('-');
        const pageRender = await getPage(`/store/category/${category}`);
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
