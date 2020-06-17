import React from 'react';
import RouterLink from './RouterLink';
import { SingleProductContainer } from '../styles/products/product.styles';
import { Price } from '../styles/products/product.styles';
import DotCMSImage from '../components/DotCMSImage';
const { currencyFormatter } = require('../utilities/shared');

function Product({ product, show, size }) {
    show = show?.split(',');
    const { retailPrice, urlTitle, image, title, salePrice, category } = product;
    const cat = category[0]?.name.toLowerCase();

    return (
        <SingleProductContainer>
            {show?.includes('image') && (
                <RouterLink className="image__link" href={`/store/products/${urlTitle}`}>
                    <DotCMSImage
                        data={{
                            path: image.idPath.split('?')[0]
                        }}
                        size={size}
                        alt={title}
                        loading="lazy"
                    />
                </RouterLink>
            )}

            <div className="meta">
                <h4 className="meta__category">
                    <RouterLink href={`/store/category/${cat}`}>{cat}</RouterLink>
                </h4>
                {show?.includes('title') && (
                    <h3 className="meta__title">
                        <RouterLink href={`/store/products/${urlTitle}`}>{title}</RouterLink>
                    </h3>
                )}

                {show?.includes('price') && (
                    <>
                        <Price salePrice={!!salePrice} small>
                            {currencyFormatter.format(retailPrice.replace(/\,/g, ''))}
                        </Price>{' '}
                        {salePrice && <Price small>{currencyFormatter.format(salePrice)}</Price>}
                    </>
                )}
            </div>
        </SingleProductContainer>
    );
}

export default Product;
