import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import withApollo from '../../../hocs/withApollo';
import Layout from '../../../components/layout/Layout';
import { getPage, getNav } from '../../../config/dotcms';
import PageContext from '../../../contexts/PageContext';
import { ProductGrid } from '../../../styles/products/product.styles';
import Product from '../../../components/Product';
import { useRouter } from 'next/router';
import RouterLink from '../../../components/RouterLink';

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

function category({ slug, pageRender, nav }) {
    const router = useRouter();
    let [category, ...rest] = slug.split('-');
    console.log({ pageRender, rest });
    let query;
    if (rest.length === 0) {
        query = `+categories:${category}`;
    } else {
        rest = rest.map((tag) => `+Product.tags:"${tag}"`);
        query = `+categories:${category} ${rest.join(' ')}`;
    }

    const { data, loading, error } = useQuery(CATEGORY_QUERY, {
        variables: {
            query
        }
    });

    console.log(data);
    console.log(router);

    if (loading) <p>Loading...</p>;
    if (error) <p>Loading...</p>;
    return (
        <div>
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
                                    <h4>Tags:</h4>
                                    <ul>
                                        {data.ProductCollection[0].tags.map((tag) => {
                                            return (
                                                <li>
                                                    <RouterLink href={`${router.asPath}-${tag}`}>
                                                        {`${router.asPath}-${tag}`}
                                                    </RouterLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
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
        </div>
    );
}

export async function getServerSideProps({ req, res, params }) {
    const pageRender = await getPage('/');
    const nav = await getNav('4');

    return {
        props: {
            slug: params.slug,
            pageRender,
            nav
        }
    };
}

export default withApollo(category);
