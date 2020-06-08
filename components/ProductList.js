import React from 'react';
import styled from 'styled-components';
import Product from '../components/Product';
import withApollo from '../hocs/withApollo';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ProductGrid } from '../styles/products/product.styles';

const PRODUCTS_QUERY = gql`
    query PRODUCTS_QUERY($limit: Int!) {
        ProductCollection(limit: $limit) {
            title
            retailPrice
            salePrice
            urlTitle
            identifier
            category {
                name
            }
            productLine {
                title
            }
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
        }
    }
`;

function ProductList({ quantity, order, orderBy, show }) {
    const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
        variables: {
            limit: quantity
        },
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <ProductGrid className="product-grid">
            {data?.ProductCollection.map((product) => (
                <Product
                    key={product.identifier}
                    product={product}
                    options={{ order, orderBy, show }}
                />
            ))}
        </ProductGrid>
    );
}

export default withApollo(ProductList);
