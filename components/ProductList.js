import React, { useContext } from 'react';
import Product from '../components/Product';
import withApollo from '../hocs/withApollo';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ProductGrid } from '../styles/products/product.styles';
import TagsFilter from './TagsFilter';
import PageContext from '../contexts/PageContext';
import Progress from './nprogress/Progress';

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

function ProductList({ quantity, order, orderBy, show, showTagsFilter }) {
    const { category, tagsFiltered, tagsList, setPath } = useContext(PageContext);

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
            <Progress
                animationDuration={300}
                incrementDuration={500}
                isAnimating={loading}
                minimum={0.1}
            />
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
                <p>Loading...</p>
            ) : data?.ProductCollection.length === 0 ? (
                <h3>No products found!</h3>
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
