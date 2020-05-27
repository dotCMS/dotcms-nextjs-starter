import React from 'react'
import styled from 'styled-components'
import Product from '../components/Product'

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  flex: 1 0 80%;
  margin-top: var(--primary-spacing);
  gap: var(--primary-spacing);
` 

function ProductList({products}) {
  return (
      <ProductGrid>
          {products.map(product => <Product product={product} />)}
      </ProductGrid>
  );
}

export default ProductList
