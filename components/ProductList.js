import React, { useContext } from 'react';
import Product from '../components/Product';
import withApollo from '../hocs/withApollo';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ProductGrid } from '../styles/products/product.styles';
import TagsFilter from './TagsFilter';
import PageContext from '../contexts/PageContext';
import styled from 'styled-components'
const PRODUCTS_QUERY = gql`
    query PRODUCTS_QUERY($limit: Int, $query: String) {
        ProductCollection(limit: $limit, query: $query) {
            title
            retailPrice
            salePrice
            urlTitle
            identifier
            tags
            host {
                hostName
            }
            image {
                idPath
            }
            image2 {
                idPath
            }
            image3 {
                idPath
            }
            category {
                name
                key
            }
        }
    }
`;


const StatusIndicator = styled.h3`
    margin: 1rem 0;
`

function ProductList({ quantity, order, orderBy, show, showTagsFilter, productLine }) {
    console.log('productLine', productLine); // category needs to be change for productLine
    const { category, tagsFiltered, tagsList, setPath } = useContext(PageContext); // This needs to be created inside this component using the useRouter hook from next.

    const getUrl = (category, tags) => {
        const tagsUrl = tags.length > 0 ? `-${tags.join('-')}` : '';
        return `/store/category/${category}${tagsUrl}`;
    };

    const tagsMap = tagsFiltered && tagsFiltered.map((tag) => `Product.tags:"${tag}"`);
    const query = `+contentType:product +categories:${category} ${
        tagsMap && tagsMap.length > 0 && '+(' + tagsMap.join(' ') + ')'
    }`;
    const options = category
        ? { variables: { limit: quantity, query } }
        : { variables: { limit: quantity } };

    const { loading, error, data } = useQuery(PRODUCTS_QUERY, options);

    if (error) return `Error! ${error}`;

    return (
        <>
            {showTagsFilter && (
                <TagsFilter
                    list={tagsList}
                    selected={tagsFiltered}
                    onFilterChange={(tags) => {
                        setPath(getUrl(category, tags));
                    }}
                />
            )}
            {loading ? (
                <StatusIndicator>Loading...</StatusIndicator>
            ) : data?.ProductCollection.length === 0 ? (
                <StatusIndicator>No products found!</StatusIndicator>
            ) : (
                <ProductGrid className="product-grid">
                    {data?.ProductCollection.map((product) => (
                        <Product
                            key={product.identifier}
                            product={product}
                            options={{ order, orderBy, show }}
                        />
                    ))}
                </ProductGrid>
            )}
        </>
    );
}

export default withApollo(ProductList);
