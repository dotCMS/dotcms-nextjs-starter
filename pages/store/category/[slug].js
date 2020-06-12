import React, { useState, useEffect } from 'react';
import Layout from '../../../components/layout/Layout';
import PageContext from '../../../contexts/PageContext';
import fetch from 'isomorphic-fetch';
import DotCMSPage from '../../../components/layout/DotCMSPage';
import { getPage, getNav } from '../../../config/dotcms';
import { useRouter } from 'next/router'

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
    const tagsList = await fetch('https://starter.dotcms.com:8443/api/es/search', {
        method: 'post',
        body: JSON.stringify({
            query: {
                query_string: {
                    query: `+contentType:product +(categories:${category})`
                }
            },
            aggs: {
                tag: {
                    terms: {
                        field: 'tags',
                        size: 100
                    }
                }
            },
            size: 0
        })
    })
        .then((res) => res.json())
        .then((result) => result.esresponse[0].aggregations['sterms#tag'].buckets);

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
