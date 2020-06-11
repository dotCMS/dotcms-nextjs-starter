import React from 'react';
import { Button } from '../../styles/shared.styles';
const { currencyFormatter } = require('../../utilities/shared');
import Head from 'next/head';
import Carousel from '../Carousel';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../../hocs/withApollo';
import gql from 'graphql-tag';
import {
    ProductContainer,
    ProductDetail,
    Price,
    Quantity
} from '../../styles/products/product.styles';
import RouterLink from '../RouterLink';

const PRODUCT_QUERY = gql`
    query PRODUCT_QUERY($identifier: String!) {
        ProductCollection(query: $identifier) {
            category {
                name
            }
        }
    }
`;

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

    const { data, loading } = useQuery(PRODUCT_QUERY, {
        variables: {
            identifier: `+identifier:${identifier}`
        }
    });

    if (!loading) {
        var {
            ProductCollection: [
                {
                    category: [{ name: categoryName }]
                }
            ]
        } = data;
    }

    return (
        <ProductContainer className="container">
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
                        <RouterLink href={`/store/category/${categoryName.toLowerCase()}`}>
                            {loading ? 'loading...' : categoryName}
                        </RouterLink>
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

export default withApollo(ProductSingle);
