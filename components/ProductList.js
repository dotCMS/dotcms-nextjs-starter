import React, {useState, useContext, useEffect} from 'react';
import Product from '../components/Product';
import withApollo from '../hocs/withApollo';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { ProductGrid } from '../styles/products/product.styles';
import TagsFilter from './TagsFilter'
import PageContext from '../contexts/PageContext'

const PRODUCTS_QUERY = gql`
    query PRODUCTS_QUERY($limit: Int, $query: String) {
        ProductCollection(limit: $limit, query: $query) {
            title
            retailPrice
            salePrice
            urlTitle
            identifier
            tags
            category {
                name
            }
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

function ProductList(props) {
    const { category, tags } = useContext(PageContext);
    const { quantity, order, orderBy, show, showTagsFilter } = props;
    const [getProducts, { loading, error, data }] = useLazyQuery(PRODUCTS_QUERY);
    const [selectedTags, setSelectedTags] = useState(tags || []);
    
    //Fetch data on initial render and when `selectedTags` change
    useEffect(() => {
        const tagsMap = selectedTags && selectedTags.map((tag) => `+Product.tags:"${tag}"`);
        const query = `+contentType:product +categories:${category} ${tagsMap.join(' ')}`;
        const options = category
            ? { variables: { query } }
            : { variables: { limit: quantity }, fetchPolicy: 'cache-and-network' };
        getProducts(options);
    }, [selectedTags]);

    if (error) return `Error! ${error}`;

    return (
        <>
            {showTagsFilter && (
                <TagsFilter
                    {...props}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
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
