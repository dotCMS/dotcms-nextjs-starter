import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import withApollo from '../../../hocs/withApollo';
import Layout from '../../../components/layout/Layout';
import PageContext from '../../../contexts/PageContext';
import Product from '../../../components/Product';
import fetch from 'isomorphic-fetch';
import { useLazyQuery } from '@apollo/react-hooks';
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
    const contentType = '+contentType:product';
    const [selectedTags, setSelectedTags] = useState(tags || []);
    const tagsMap = selectedTags && selectedTags.map((tag) => `+Product.tags:"${tag}"`);

    const query =
        selectedTags.length === 0
            ? `${contentType} +categories:${category}`
            : `${contentType} +categories:${category} ${tagsMap.join(' ')}`;

    const [getData, { data, loading, error }] = useLazyQuery(CATEGORY_QUERY, {
        variables: {
            query
        }
    });

    const getFilteredTag = (value) => {
        const currentTags = router.asPath.split('/').pop().split('-');
        const newPath = currentTags.filter((item) => item !== value).join('-');
        return `/store/category/${newPath}`;
    };

    const handleCheckbox = (e) => {
        let url;
        if (e.target.checked) {
            setSelectedTags([...selectedTags, e.target.value]);
            url = `${router.asPath}-${e.target.value}`;
        } else {
            setSelectedTags(selectedTags.filter((tag) => tag !== e.target.value));
            url = getFilteredTag(e.target.value);
        }
        router.push('/store/category/[slug]', url, { shallow: true });
    };

    // Fetch data on initial render and when `selectedTags` change
    useEffect(() => {
        getData();
    }, [selectedTags]);

    typeof window !== 'undefined' &&
        router?.beforePopState(({ as }) => {
            const previous = as
                .split('/')
                .slice(-1)[0]
                .split('-')
                .filter((cat) => cat !== category);
            setSelectedTags(previous);
            return true;
        });

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
                            {data?.ProductCollection.length > 0 ? (
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
