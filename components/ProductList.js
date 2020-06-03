import React from 'react';
import styled from 'styled-components';
import Product from '../components/Product';
import withApollo from '../setup/withApollo';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ProductGrid } from '../styles/products/product';

const PRODUCT_QUERY = gql`
    query PRODUCT_QUERY($limit: Int!) {
        ProductCollection(limit: $limit) {
            title
            retailPrice
            salePrice
            urlTitle
            identifier
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
    const { loading, error, data } = useQuery(PRODUCT_QUERY, {
        variables: {
            limit: quantity
        },
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <ProductGrid>
            {data?.ProductCollection.map((product, i) => (
                <Product key={product.identifier} product={product} options={{ order, orderBy, show }} />
            ))}
        </ProductGrid>
    );
}

export default withApollo(ProductList);
