import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const ProductContainer = styled.div`
  .meta {
      margin-top: var(--primary-spacing);
      &__category, &__title {
        margin-bottom: 1rem;
      }
      &__category {
        a {
          text-decoration: none;
          color: var(--primary-purple);
          &:hover {
            color: var(--primary-black)
          }
        }
        text-transform: uppercase;
        font-size: .825rem;
      }
      &__title {
        font-size: 1.2rem;
        line-height: 1.6rem;
        a {
          text-decoration: none;
        }
      }
      &__price--strikethrough {
        color: #666;
        text-decoration: line-through;
        font-style: italic;
        margin-right: .5rem;
      }
  }
   img {
    width: 100%;
    height: 25rem;
    object-fit: cover;
    display: block;
  }
  `;

function Product({product}) {

  const { retailPrice, urlTitle, tags, image, title, salePrice, hostName, productLine } = product;
  
  return (
      <ProductContainer>
          <img src={`//${hostName}/${image}`} alt={title} />
          <div className="meta">
              <h4 className="meta__category">
                  <a href="#">{productLine[0].title}</a>
              </h4>
              <h3 className="meta__title">
                  <Link href={`/product/${urlTitle}`}>
                      <a>{title}</a>
                  </Link>
              </h3>
              {salePrice && (
                  <span className="meta__price--strikethrough">
                      {currencyFormatter.format(salePrice)}
                  </span>
              )}
              <span className="meta__price">{currencyFormatter.format(retailPrice)}</span>
          </div>
      </ProductContainer>
  );
}

export default Product
