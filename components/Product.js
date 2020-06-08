import React from 'react';
import RouterLink from './RouterLink';
import { SingleProductContainer } from '../styles/products/product.styles';
import { Price } from '../styles/products/product.styles';
const { currencyFormatter } = require('../utilities/shared');

function Product({ product, options = {} }) {
    const show = options.show?.split(',');
    const { retailPrice, urlTitle, tags, image, title, salePrice, host, productLine } = product;

    return (
        <SingleProductContainer>
            {/* {show.includes('image') && ( )} */}

            <RouterLink href={`/store/products/${urlTitle}`}>
                <img
                    src={`https://${host.hostName}:8443${
                        image.idPath.split('?')[0]
                    }/filter/Resize,Jpeg/resize_w/250/jpeg_q/16`}
                    alt={title}
                />
            </RouterLink>
           
            <div className="meta">
                <h4 className="meta__category">
                    <a href="#">{productLine[0].title}</a>
                </h4>
                {/* {show.includes('title') && ()} */}
                    <h3 className="meta__title">
                        <RouterLink href={`/store/products/${urlTitle}`}>{title}</RouterLink>
                    </h3>
                

                {/* {show.includes('price') && (} */}
                    <>
                        {salePrice && <Price small>{currencyFormatter.format(salePrice)}</Price>}
                        <Price salePrice={!!salePrice} small>
                            {currencyFormatter.format(retailPrice)}
                        </Price>{' '}
                    </>
                )
            </div>
        </SingleProductContainer>
    );
}

export default Product;
