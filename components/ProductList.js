import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import withApollo from '../hocs/withApollo';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ProductGrid, StatusIndicator } from '../styles/products/product.styles';
import TagsFilter from './TagsFilter';
import { useRouter } from 'next/router';
import getTagsListForCategory from '../utilities/getTagsListForCategory';

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

    // Find the category and tags from the URL
    const router = useRouter();
    let { asPath: path } = router;
    path = path.split('/').pop();
    
    // Separate category from tags
    const [category, ...tagsFiltered] = path.split('-');

    // Initialize our state
    const [tagsList, setTagsList] = useState([]);
    const [routePath, setRoutePath] = useState("");

    // On first render set the tags list
    useEffect(() => {
        (async function getTags() {
            const tags = await getTagsListForCategory(category);
            setTagsList(tags);
        })()
    }, []);

    // Everytime `routePath` changes push the new path
    useEffect(() => {
         routePath && router.push('/store/category/[slug]', routePath);
    }, [routePath]);

    const getUrl = (category, tags) => {
        const tagsUrl = tags.length > 0 ? `-${tags.join('-')}` : '';
        return `/store/category/${category}${tagsUrl}`;
    };

    const tagsMap = tagsFiltered && tagsFiltered.map((tag) => `Product.tags:"${tag}"`);
    
    const query = `+contentType:product +categories:${category} ${
        tagsMap && tagsMap.length > 0 && `+(${tagsMap.join(' ')})`
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
                        setRoutePath(getUrl(category, tags));
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
