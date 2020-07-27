import React from 'react';

import RouterLink from './RouterLink';
import DotCMSImage from './DotCMSImage';
import { SingleProductContainer } from '../styles/products/product.styles';
import { Price } from '../styles/products/product.styles';

const { currencyFormatter } = require('../utilities');

const shouldIShow = (show, item) => {
    if (show === 'all') {
        return true;
    }

    show = show?.split(',');
    return show?.includes(item);
};

export default function ProductItem({ product, show }) {
    const { retailPrice, urlTitle, image, title, salePrice, category } = product;

    return (
        <SingleProductContainer>
            {shouldIShow(show, 'image') && (
                <RouterLink className="image__link" href={`/store/products/${urlTitle}`}>
                    <DotCMSImage {...image} loading="lazy" />
                </RouterLink>
            )}

            <div className="meta">
                <h4 className="meta__category">
                    <RouterLink href={`/store/category/${category}`}>{category}</RouterLink>
                </h4>
                {shouldIShow(show, 'title') && (
                    <h3 className="meta__title">
                        <RouterLink href={`/store/products/${urlTitle}`}>{title}</RouterLink>
                    </h3>
                )}

                {shouldIShow(show, 'price') && (
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
