import React, { useState, useEffect } from 'react';
import Layout from '../../../components/layout/Layout';
import PageContext from '../../../contexts/PageContext';
import DotCMSPage from '../../../components/layout/DotCMSPage';
import { getPage, getNav } from '../../../config/dotcms';

function category({ pageRender, nav }) {

    return (
        <PageContext.Provider
            value={{
                nav,
                pageRender
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
    const [category] = params.slug.split('-');
    const pageRender = await getPage(`/store/category/${category}/index`);
    const nav = await getNav('4');
    return {
        props: {
            pageRender,
            nav,
        }
    };
}

export default category;
