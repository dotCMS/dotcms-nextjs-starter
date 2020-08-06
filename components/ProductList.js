import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { useApollo } from '../config/apollo';
import { ProductGrid, StatusIndicator } from '../styles/products/product.styles';
import useTagsList from '../hooks/useTagsList';
import useTagsFiltered from '../hooks/useTagsFiltered';
import TagsFilter from './TagsFilter';
import ProductItem from '../components/ProductItem';
import Loading from '../components/Loading';

const PRODUCTS_QUERY = gql`
    query PRODUCTS_QUERY($limit: Int, $query: String) {
        ProductCollection(limit: $limit, query: $query) {
            title
            retailPrice
            salePrice
            urlTitle
            identifier
            tags
            modDate
            host {
                hostName
            }
            image {
                idPath
            }
            image2 {
                idPath
            }
            image3 {
                idPath
            }
            category {
                name
                key
            }
        }
    }
`;

function ProductList({ quantity, show, showTagsFilter, productLine, width, height }) {
    const client = useApollo();
    let category;

    if (productLine) {
        [category] = productLine;
        category = Object.values(category)[0].toLowerCase?.();
    }

    const tagsList = useTagsList(category);
    const [tagsFiltered, setRoutePath, tagsMap] = useTagsFiltered();

    const getUrl = (category, tags) => {
        const tagsUrl = tags.length > 0 ? `-${tags.join('-')}` : '';
        return `/store/category/${category}${tagsUrl}`;
    };

    const query = `+contentType:product ${category && `+categories:${category}`}`;

    let options = { variables: { limit: quantity, query }, client, errorPolicy: 'none' };
    const [getData, { loading, data, error }] = useLazyQuery(PRODUCTS_QUERY, options);

    useEffect(() => {
        // To avoid running the GraphQL query in the server we run it only if we're in client-side
        if (window !== 'undefined') {
            getData();
        }
    }, []);

    return (
        <>
            {showTagsFilter && (
                <TagsFilter
                    list={tagsList}
                    selected={tagsFiltered}
                    onFilterChange={(tags) => {
                        setRoutePath(getUrl(category, tags));
                        // setRoutePath({ href: '/store/category/[slug]', as: 'url' });
                    }}
                />
            )}
            {loading ? (
                <Loading />
            ) : data?.ProductCollection.length === 0 ? (
                <StatusIndicator>No products found!</StatusIndicator>
            ) : (
                <ProductGrid width={width} className="product-grid">
                    {data?.ProductCollection.map((product) => {
                        const [category] = product?.category.map((item) => {
                            const [name] = Object.values(item);
                            return name;
                        });
                        const data = {
                            ...product,
                            category,
                            ...{
                                image: {
                                    path: product.image.idPath,
                                    size: {
                                        height,
                                        width,
                                        alt: product.title
                                    }
                                }
                            }
                        };

                        return <ProductItem key={product.identifier} product={data} show={show} />;
                    })}
                </ProductGrid>
            )}
        </>
    );
}

export default ProductList;
