import React from 'react'
import { Container, Button } from '../../styles/shared.styles';
import Flickity from 'react-flickity-component';
import styled from 'styled-components'
import {currencyFormatter} from '../../components/Product'
import fetch from 'isomorphic-fetch'

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
            margin-bottom: .5rem;
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


function product({product: prod}) {

  let [product] = prod?.contentlets ?? [];

  return (
      <Container>
          <ProductContainer className="product-container">
              <Carousel>
                  <Flickity
                      className={'carousel'} // default ''
                      elementType={'div'} // default 'div'
                      options={flickityOptions} // takes flickity options {}
                      disableImagesLoaded={false} // default false
                      reloadOnUpdate // default false
                      static // default false
                  > 
                      <img src={`//${product?.hostName}/${product?.image}`} alt={product?.title} />
                      <img src={`//${product?.hostName}/${product?.image2}`} alt={product?.title} />
                      <img src={`//${product?.hostName}/${product?.image3}`} alt={product?.title} />
                  </Flickity>
              </Carousel>
              <ProductDetail>
                  <div className="meta">
                      <h4 className="meta__category">
                          <a href="#">{product?.productLine[0].title}</a>
                      </h4>
                      <h3 className="meta__title">{product?.title}</h3>
                      <span className="meta__price">
                          {currencyFormatter.format(product?.retailPrice)}
                      </span>
                  </div>

                  <div dangerouslySetInnerHTML={{ __html: product?.description }} />

                  <Price type="number" name="price" id="price" placeholder="1" />
                  <Button href="#">Add to cart</Button>
              </ProductDetail>
          </ProductContainer>
      </Container>
  );
}

export async function getStaticPaths() {
    const res = await fetch(
        `${process.env.DOTCMS_HOST}/api/content/render/false/type/json/query/-contentType:forms%20+contentType:Product%20+live:true%20/orderby/modDate%20desc/depth/3/limit/10`
    );
    const products = await res.json();

    const paths = products.contentlets.map((product) => ({
        params: { slug: product.urlTitle }
    }));

    return {
        paths,
        fallback: true
    };
}

export async function getStaticProps ({params}) {
    let product = await fetch(
        `${process.env.DOTCMS_HOST}/api/content/query/+contentType:Product%20+Product.urlTitle:"${params.slug}"/depth/3`
    );
    product = await product.json()
    return {
        props: {
            product
        },
        unstable_revalidate: 1
    };
};

export default product