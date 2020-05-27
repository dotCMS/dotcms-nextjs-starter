import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  flex: 1 0 80%;
  margin-top: var(--primary-spacing);
  gap: var(--primary-spacing);
`

const Product = styled.div`
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
const random = () => Math.floor(Math.random() * 100) + 1;
const getRandomSource = (i) => `https://picsum.photos/id/${+i}/2080/1440`;
const imageGenerator = () => {
  var images = []
  for(let i = 0; i < 9; i++) {
    images.push(getRandomSource(random()));
  }
  return images;
}

function ProductList() {
  return (
      <ProductGrid>
          {imageGenerator().map((i) => (
              <Product>
                  <img src={i} alt="" />
                  <div className="meta">
                      <h4 className="meta__category">
                          <a href="#">Women</a>
                      </h4>
                      <h3 className="meta__title">
                          <Link href="/product/1">
                              <a>Striped Cotton Shirt</a>
                          </Link>
                      </h3>
                      <span className="meta__price--strikethrough">$75.50</span>
                      <span className="meta__price">$75.50</span>
                  </div>
              </Product>
          ))}
      </ProductGrid>
  );
}

export default ProductList
