import React from 'react'
import styled from 'styled-components'
import Product from '../components/Product'
import withApollo from '../setup/withApollo';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const PRODUCT_QUERY = gql`
    query PRODUCT_QUERY($limit: Int!){
        ProductCollection(limit: $limit) {
            title
            retailPrice
            salePrice
            urlTitle
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  flex: 1 0 80%;
  margin-top: var(--primary-spacing);
  gap: var(--primary-spacing);
` 

function ProductList({quantity, order, orderBy, show}) {
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
      variables: {
          limit: quantity
      }
  });

  console.log({ loading, data, error });
  return (
      <ProductGrid>
          {data?.ProductCollection.map((product) => (
              <Product product={product} options={{ order, orderBy, show }} />
          ))}
      </ProductGrid>
  );
}

export default withApollo(ProductList);
