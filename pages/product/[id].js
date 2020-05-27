import React from 'react'
import { Container, Button } from '../../styles/shared.styles';
import Flickity from 'react-flickity-component';
import styled from 'styled-components'
const flickityOptions = {
    contain: true,
    pageDots: true,
    fullscreen: true
};

const Carousel = styled.div`
  width: 100%;
  img {
    height: 400px;
    object-fit: cover;

  }
`

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--primary-spacing);
`

const ProductDetail = styled.div`
    .meta {
        &__category {
            text-transform: uppercase;
            font-size: 0.825rem;
            margin-bottom: 1.25rem;
            a {
                text-decoration: none;
                color: var(--primary-purple);
                &:hover {
                    color: var(--primary-black);
                }
            }
        }
        &__title {
          margin-bottom: 1.05rem;
        }
        &__price {
          font-size: 1.25rem;
          margin-bottom: 1.05rem;
          display: inline-block;
        }
    }
`;

function product() {
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
                      <img src="https://images.unsplash.com/photo-1588257207572-f5baae14f932?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=915&h=600&fit=crop" />
                      <img src="https://images.unsplash.com/photo-1589514863821-8af9bb2745b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=square&cs=tinysrgb&w=915&h=600&fit=crop" />
                      <img src="https://images.unsplash.com/photo-1590314896473-4bdfeab10a00?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=915&h=600&fit=crop" />
                  </Flickity>
              </Carousel>
              <ProductDetail>
                  <div className="meta">
                      <h4 className="meta__category">
                          <a href="#">Snow Gear</a>
                      </h4>
                      <h3 className="meta__title">Striped Cotton Shirt</h3>
                      <span className="meta__price">$849.99</span>
                  </div>
                  <p>
                      For your trophy quest, only the legendary strength and performance of a Penn
                      International VIS/Offshore Angler™ Ocean Master Stand-Up Combo will do. The
                      pairing of the world's premier 2-speed conventional reel and an acclaimed rod
                      with virtually unlimited lifting power gives you the advantage against the
                      biggest game in the sea.
                  </p>
                  <Button href="#">Add to cart</Button>
              </ProductDetail>
          </ProductContainer>
      </Container>
  );
}

export default product
