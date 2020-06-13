import React, { useState, useEffect } from 'react';
import Layout from '../../../components/layout/Layout';
import PageContext from '../../../contexts/PageContext';
import DotCMSPage from '../../../components/layout/DotCMSPage';
import { getPage, getNav } from '../../../config/dotcms';
import { useRouter } from 'next/router'
import getTagsList from '../../../utilities/getTagsList'

function category({ category, tagsFiltered, pageRender, nav, tagsList }) {
    const router = useRouter();
    const [path, setPath] = useState();

    useEffect(() => {
        path && router.push('/store/category/[slug]', path);
    }, [path]);

    return (
        <PageContext.Provider
            value={{
                nav,
                tagsFiltered,
                category,
                tagsList,
                setPath
            }}
        >
            {pageRender?.layout ? (
                <Layout {...pageRender?.layout}>
                    <DotCMSPage pageRender={pageRender} />
                </Layout>
            ) : (
                <h2>{pageRender?.page?.title}</h2>
            )}
        </PageContext.Provider>
    );
}

export async function getServerSideProps({ params }) {
    const [category, ...tagsFiltered] = params.slug.split('-');
    const tagsList = await getTagsList(category);
    const pageRender = await getPage(`/store/category/${category}/index`);
    const nav = await getNav('4');
    return {
        props: {
            category,
            tagsFiltered,
            pageRender,
            nav,
            tagsList
        }
    };
}

export default category;
