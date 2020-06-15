import React from 'react';
import DotCMSPage from '../../../components/layout/DotCMSPage';
import { getPage, getNav } from '../../../config/dotcms';

export default function ({ pageRender, nav }) {
    return <DotCMSPage pageRender={pageRender} nav={nav} />;
}

export async function getServerSideProps({ params }) {
    const [category] = params.slug.split('-');
    const pageRender = await getPage(`/store/category/${category}/index`);
    const nav = await getNav('4');
    return {
        props: {
            pageRender,
            nav
        }
    };
}
