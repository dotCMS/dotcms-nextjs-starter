import React from 'react';
import { Container, Button } from '../../styles/shared.styles';
import Flickity from 'react-flickity-component';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const flickityOptions = {
    contain: true,
    pageDots: true,
    fullscreen: true
};

const Carousel = styled.div`
    /* width: 100%; */
    img {
        object-fit: cover;
    }
    .carousel-cell {
        width: 100%; /* full width */
        height: 160px; /* height of carousel */
        margin-right: 10px;
    }
`;

const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--primary-spacing);
    margin-bottom: 5rem;
`;

const ProductDetail = styled.div`
    .meta {
        &__category {
            text-transform: uppercase;
            font-size: 0.825rem;
            margin-bottom: 0.5rem;
            a {
                text-decoration: none;
                color: var(--primary-purple);
                &:hover {
                    color: var(--primary-black);
                }
            }
        }
        &__title {
            line-height: 2rem;
        }
        &__price {
            font-size: 1.25rem;
            margin-bottom: 1.6rem;
            display: inline-block;
        }
    }
    ul {
        margin-left: 1.6rem;
        margin-bottom: 1.6rem;
    }
`;

const Price = styled.input`
    background: #f1f3f4;
    padding: 0.5rem 0rem;
    border: none;
    border-bottom: 2px solid grey;
    font-size: 18px;
    width: 11%;
    margin-right: 1rem;
    text-align: center;
`;

function ProductSingle({
  image,
  image2,
  image3,
  hostName,
  title,
  description,
  retailPrice,
  salePrice,
  tags,
  identifier,
  ...rest
}) {
  // console.log(image, image2, image3)
  return (
      <ProductContainer className="product-container container">
          <Carousel>
              <Flickity
                  className={'carousel'} // default ''
                  elementType={'div'} // default 'div'
                  options={flickityOptions} // takes flickity options {}
                  disableImagesLoaded={false} // default false
                  reloadOnUpdate // default false
                  static // default false
              >
                  <img src={`https://${hostName}:8443/dA/${identifier}/image`} alt={title} />
                  <img src={`https://${hostName}:8443/dA/${identifier}/image2`} alt={title} />
                  <img src={`https://${hostName}:8443/dA/${identifier}/image3`} alt={title} />
              </Flickity>
          </Carousel>
          <ProductDetail>
              <div className="meta">
                  <h4 className="meta__category">
                      <a href="#">product?.productLine[0].title</a>
                  </h4>
                  <h3 className="meta__title">{title}</h3>
                  <span className="meta__price">
                      {currencyFormatter.format(retailPrice)}
                  </span>
              </div>

              <div dangerouslySetInnerHTML={{ __html: description }} />

              <Price type="number" name="price" id="price" placeholder="1" />
              <Button href="#">Add to cart</Button>
          </ProductDetail>
      </ProductContainer>
  );
}

export default ProductSingle
