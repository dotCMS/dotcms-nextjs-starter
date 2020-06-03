import React from 'react';
import { Button } from '../../styles/shared.styles';
import Flickity from 'react-flickity-component';
const { currencyFormatter } = require('../../utils/index')
import {
  Carousel,
  ProductContainer,
  ProductDetail,
  Price,
  Quantity,
} from '../../styles/products/product-single'

const flickityOptions = {
    contain: true,
    pageDots: true,
    fullscreen: true
};

function ProductSingle({
  hostName,
  title,
  description,
  retailPrice,
  salePrice,
  tags,
  identifier,
}) {

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
                  {salePrice && <Price salePrice={!!salePrice}>{currencyFormatter.format(salePrice)}</Price>}
                  <Price>{currencyFormatter.format(retailPrice)}</Price>
              </div>

              <div dangerouslySetInnerHTML={{ __html: description }} />

              <Quantity
                  type="number"
                  name="product_quantity"
                  id="product_quantity"
                  placeholder="1"
              />
              <Button href="#">Add to cart</Button>
          </ProductDetail>
      </ProductContainer>
  );
}

export default ProductSingle
