import React from 'react';
import { Button } from '../../styles/shared.styles';
const { currencyFormatter } = require('../../utilities/shared');
import Head from 'next/head';
import Carousel from '../Carousel';

import {
    CarouselContainer,
    ProductContainer,
    ProductDetail,
    Price,
    Quantity
} from '../../styles/products/product-single';

function ProductSingle({
    title,
    description,
    retailPrice,
    salePrice,
    tags,
    identifier,
    image,
    image2,
    image3
}) {
    const imagesFound = () => {
        return !!image || !!image2 || !!image3;
    };

    return (
        <ProductContainer className="product-container container">
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
            </Head>

            {imagesFound() && (
                <Carousel
                    images={{ image, image2, image3 }}
                    identifier={identifier}
                    title={title}
                />
            )}

            <ProductDetail>
                <div className="meta">
                    <h4 className="meta__category">
                        <a href="#">product?.productLine[0].title</a>
                    </h4>
                    <h3 className="meta__title">{title}</h3>
                    <Price salePrice={!!salePrice}>{currencyFormatter.format(retailPrice)}</Price>
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
