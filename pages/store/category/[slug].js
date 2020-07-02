import React from 'react';
import DotCMSPage from '../../../components/layout/DotCMSPage';
import { getPage, getNav } from '../../../utilities/dotcms';
import Error from '../../../components/layout/Error';

export default function ({ pageRender, nav, error }) {
    if (error) {
        return <Error statusCode={error.statusCode} message={error.message} />;
    }
    return <DotCMSPage pageRender={pageRender} nav={nav} />;
}

export async function getServerSideProps({ params }) {
    try {
        const [category] = params.slug.split('-');
        const pageRender = await getPage(`/store/category/${category}`);
        const nav = await getNav('4');
        return {
            props: {
                pageRender,
                nav
            }
        };
    } catch (error) {
        return {
            props: { error }
        };
    }
}
