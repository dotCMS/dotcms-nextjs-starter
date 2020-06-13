import React, { useContext } from 'react';
import { Button } from '../../styles/shared.styles';
const { currencyFormatter } = require('../../utilities/shared');
import Head from 'next/head';
import Carousel from '../Carousel';

import {
    ProductContainer,
    ProductDetail,
    Price,
    Quantity
} from '../../styles/products/product.styles';

function ProductSingle({
    title,
    description,
    retailPrice,
    salePrice,
    identifier,
    image,
    image2,
    image3
}) {
    const imagesFound = () => {
        return !!image || !!image2 || !!image3;
    };
    
    return (
        <ProductContainer className="container">
            {imagesFound() && (
                <Carousel
                    images={{ image, image2, image3 }}
                    identifier={identifier}
                    title={title}
                />
            )}

            <ProductDetail>
                <div className="meta">
                    <h3 className="meta__title">{title}</h3>
                    <Price salePrice={!!salePrice}>
                        {currencyFormatter.format(retailPrice.replace(/\,/g, ''))}
                    </Price>
                    {salePrice && <Price>{currencyFormatter.format(salePrice)}</Price>}
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

export default ProductSingle;
