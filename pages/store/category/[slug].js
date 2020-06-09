import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import withApollo from '../../../hocs/withApollo';
import Layout from '../../../components/layout/Layout';
import { getPage, getNav } from '../../../config/dotcms';
import PageContext from '../../../contexts/PageContext';
import { ProductGrid } from '../../../styles/products/product.styles';
import Product from '../../../components/Product';

const CATEGORY_QUERY = gql`
    query CATEGORY_QUERY($query: String!) {
        ProductCollection(query: $query) {
            title
            tags
            retailPrice
            salePrice
            urlTitle
            tags
            image {
                idPath
            }
            host {
                hostName
            }
            productLine {
                title
            }
            category {
                name
                key
            }
        }
    }
`;

function category({ category, tags, pageRender, nav }) {

    let query, tagsMap;
    if (tags.length === 0) {
        query = `+categories:${category}`;
    } else {
        tagsMap = tags.map((tag) => `+Product.tags:"${tag}"`);
        query = `+categories:${category} ${tagsMap.join(' ')}`;
    }

    const { data, loading, error } = useQuery(CATEGORY_QUERY, {
        variables: {
            query
        }
    });

    if (loading) <p>Loading...</p>;
    if (error) <p>Loading...</p>;

    return (
      <>
          {data && (
              <PageContext.Provider
                  value={{
                      nav: nav || []
                  }}
              >
                  <Layout>
                      <div className="container">
                          {data.ProductCollection.length > 0 ? (
                              <>
                                  <h3>Category: {data.ProductCollection[0].category[0].name}</h3>
                                  <h4>Tags: {data.ProductCollection[0].tags.join(', ')}</h4>
                                  <ProductGrid className="product-grid">
                                      {data.ProductCollection.map((product) => (
                                          <Product product={product} />
                                      ))}
                                  </ProductGrid>
                              </>
                          ) : (
                              <h3>No products found.</h3>
                          )}
                      </div>
                  </Layout>
              </PageContext.Provider>
          )}
      </>
    );
}

export async function getServerSideProps({ req, res, params }) {
    
    const [category, ...tags] = params.slug.split("-")
    const pageRender = await getPage(`/store/category/${category}/index`);
    const nav = await getNav('4');

    return {
        props: {
            category,
            tags,
            pageRender,
            nav
        }
    };
}

export default withApollo(category);
