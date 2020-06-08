import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import withApollo from '../../../hocs/withApollo';
import Layout from '../../../components/layout/Layout';
import { getPage, getNav } from '../../../config/dotcms';
import PageContext from '../../../contexts/PageContext';

const CATEGORY_QUERY = gql`
    query CATEGORY_QUERY($query: String!) {
        ProductCollection(query: $query) {
            title
            tags
            category {
                name
                key
            }
        }
    }
`;

function category({ slug, pageRender, nav }) {

  console.log(pageRender);
    let [category, ...rest] = slug.split('-');

    let query;
    if (typeof category === 'string') {
        query = `+categories:${category}`;
    } else {
        if (rest) {
            rest = rest.map((tag) => `+Product.tags:"${tag}"`);
            query = `+categories:${category} ${rest.join(' ')}`;
        }
    }

    const { data, loading, error } = useQuery(CATEGORY_QUERY, {
        variables: {
            query
        }
    });

    if (loading) <p>Loading...</p>;
    if (error) <p>Loading...</p>;

    return (
        <div>
            {data && (
                <PageContext.Provider value={{ 
                  nav: nav || []
                 }}>
                    <Layout>
                        <h1>Category: {data.ProductCollection[0].category[0].name}</h1>
                        <h3>Tags: {data.ProductCollection[0].tags.join(', ')}</h3>

                        {data.ProductCollection.map((item) => (
                            <h3>{item.title}</h3>
                        ))}
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
