import React from 'react'
import Link from 'next/link'
const { currencyFormatter } = require('../utils/index');
import {ProductContainer} from '../styles/products/product'
import {Price} from '../styles/products/product-single'

function Product({product, options}) {
  
  const show = options.show.split(",");

  const { retailPrice, urlTitle, tags, image, title, salePrice, host, productLine } = product;
  return (
      <ProductContainer>
          {show.includes('image') && (
              <img src={`https://${host.hostName}:8443${image.idPath}`} alt={title} />
          )}
          <div className="meta">
              <h4 className="meta__category">
                  <a href="#">{productLine[0].title}</a>
              </h4>
              {show.includes('title') && (
                  <h3 className="meta__title">
                      <Link href={`/store/products/${urlTitle}`}>
                          <a>{title}</a>
                      </Link>
                  </h3>
              )}

              {show.includes('price') && (
                  <>
                      {salePrice && (
                          <Price salePrice={!!salePrice} small>
                              {currencyFormatter.format(salePrice)}
                          </Price>
                      )}
                      <Price small>{currencyFormatter.format(retailPrice)}</Price>
                  </>
              )}
          </div>
      </ProductContainer>
  );
}

export default Product
