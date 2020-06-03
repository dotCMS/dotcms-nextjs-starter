import React from 'react';
import RouterLink from '../components/Shared/RouterLink';
import { ProductContainer } from '../styles/products/product';
import { Price } from '../styles/products/product-single';
const { currencyFormatter } = require('../utils/index');

function Product({ product, options }) {
    const show = options.show.split(',');

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
                        <RouterLink
                            href={`/store/products/${urlTitle}`}
                            as={`/store/products/${urlTitle}`}
                        >
                            {title}
                        </RouterLink>
                    </h3>
                )}

                {show.includes('price') && (
                    <>
                        {salePrice && <Price small>{currencyFormatter.format(salePrice)}</Price>}
                        <Price salePrice={!!salePrice} small>
                            {currencyFormatter.format(retailPrice)}
                        </Price>{' '}
                    </>
                )}
            </div>
        </ProductContainer>
    );
}

export default Product;
