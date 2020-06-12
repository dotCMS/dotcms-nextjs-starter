import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import withApollo from '../../../hocs/withApollo';
import Layout from '../../../components/layout/Layout';
import PageContext from '../../../contexts/PageContext';
import Product from '../../../components/Product';
import fetch from 'isomorphic-fetch';
import DotCMSPage from '../../../components/layout/DotCMSPage';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { getPage, getNav } from '../../../config/dotcms';
import { ProductGrid } from '../../../styles/products/product.styles';
import { useRouter } from 'next/router';

const CATEGORY_QUERY = gql`
    query CATEGORY_QUERY($query: String!) {
        ProductCollection(query: $query) {
            title
            tags
            retailPrice
            salePrice
            urlTitle
            tags
            image {
                idPath
            }
            host {
                hostName
            }
            category {
                name
                key
            }
        }
    }
`;

function category({ category, tags, pageRender, nav, tagsList }) {
    const router = useRouter();
    const { data, loading, error } = useQuery(CATEGORY_QUERY, {
        variables: {
            query: '+contentType:product +categories:water'
        }
    });

    return (
        <>
            {loading ? (
                <Layout>
                    <div className="container">
                        <span>Loading...</span>
                    </div>
                </Layout>
            ) : error ? (
                <Layout>
                    <div className="container">
                        <span>Error...</span>
                    </div>
                </Layout>
            ) : (
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
            )}
        </>
    );
}

export async function getServerSideProps({ params }) {
    const [category, ...tags] = params.slug.split('-');

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

export default withApollo(category);
