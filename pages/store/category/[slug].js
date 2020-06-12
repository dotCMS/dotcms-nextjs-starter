import React from 'react';
import gql from 'graphql-tag';
import Layout from '../../../components/layout/Layout';
import PageContext from '../../../contexts/PageContext';
import fetch from 'isomorphic-fetch';
import DotCMSPage from '../../../components/layout/DotCMSPage';
import { getPage, getNav } from '../../../config/dotcms';

function category({ category, tags, pageRender, nav, tagsList }) {
    return (
        <PageContext.Provider
            value={{
                nav: nav || [],
                tags,
                category,
                tagsList
            }}
        >
            {pageRender?.layout ? (
                <Layout {...pageRender?.layout}>
                    <DotCMSPage pageRender={pageRender} tags={tags} category={category} />
                </Layout>
            ) : (
                <h2>{pageRender?.page?.title}</h2>
            )}
        </PageContext.Provider>
    );
}

export async function getServerSideProps({ params }) {
    const [category, ...tags] = params.slug.split('-');
    console.log({category})
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
            tags,
            pageRender,
            nav,
            tagsList
        }
    };
}

export default category;
