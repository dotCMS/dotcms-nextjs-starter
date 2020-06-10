import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import withApollo from '../../../hocs/withApollo';
import Layout from '../../../components/layout/Layout';
import { getPage, getNav } from '../../../config/dotcms';
import PageContext from '../../../contexts/PageContext';
import { ProductGrid } from '../../../styles/products/product.styles';
import Product from '../../../components/Product';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-fetch';

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
    let query, tagsMap;
    const router = useRouter();

    const contentType = '+contentType:product';
    tagsMap = tags && tags.map((tag) => `+Product.tags:"${tag}"`);
    query =
        tags.length === 0
            ? `${contentType} +categories:${category}`
            : `${contentType} +categories:${category} ${tagsMap.join(' ')}`;

    const { data, loading, error } = useQuery(CATEGORY_QUERY, {
        variables: {
            query
        }
    });

    const [selectedTags, setSelectedTags] = useState(tags || []);

    const removeTagFromPath = (value) => {
        let [storePath, categoryPath, categoryTagsPath] = router.asPath.split('/').filter(Boolean);
        categoryTagsPath = categoryTagsPath.split('-').filter((t) => t !== value);
        let newPath = [storePath, categoryPath, categoryTagsPath.join('-')].join('/');
        router.push('/store/category/[slug]', `/${newPath}`); 
    }

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setSelectedTags([...selectedTags, e.target.value]);
            router.push('/store/category/[slug]', `${router.asPath}-${e.target.value}`);
        } else {
            setSelectedTags(selectedTags.filter((tag) => tag !== e.target.value));
            removeTagFromPath(e.target.value);
        }
    };

    return (
        <>
            {loading ? (
                <span>Loading...</span>
            ) : error ? (
                <span>Error...</span>
            ) : (
                <PageContext.Provider
                    value={{
                        nav: nav || []
                    }}
                >
                    <Layout>
                        <div className="container">
                            {data.ProductCollection.length > 0 ? (
                                <>
                                    <h3>Category: {category}</h3>
                                    <h4>Tags: </h4>
                                    {tagsList.map(({ key, doc_count }) => {
                                        const checked = selectedTags.includes(key);
                                        return (
                                            <>
                                                <input
                                                    type="checkbox"
                                                    name={key}
                                                    value={key}
                                                    checked={checked}
                                                    onChange={handleCheckbox}
                                                />
                                                <label htmlFor={key}>
                                                    {key} ({doc_count})
                                                </label>
                                            </>
                                        );
                                    })}
                                    <ProductGrid className="product-grid">
                                        {data.ProductCollection.map((product) => (
                                            <Product product={product} />
                                        ))}
                                    </ProductGrid>
                                </>
                            ) : (
                                <h3>No products found.</h3>
                            )}
                        </div>
                    </Layout>
                </PageContext.Provider>
            )}
        </>
    );
}

export async function getServerSideProps({ req, res, params }) {
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
