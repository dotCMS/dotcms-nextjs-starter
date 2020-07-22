const gql = require('graphql-tag');
const { initializeApollo } = require('../../config/apollo');
const apolloClient = initializeApollo();

const PAGES_TO_FILTER = ['/store/product-line', '/store/product-detail', '/store/cart'];

const getPageList = async () => {
    const PAGES_QUERY = gql`
        {
            search(query: "+(urlmap:/* OR (basetype:5 AND path:/*))") {
                urlMap
                ... on htmlpageasset {
                    url
                }
                ... on Destination {
                    url
                }
                ...on LandingPage {
                    url
                }
            }
        }
    `;

    const { data } = await apolloClient.query({
        query: PAGES_QUERY
    });

    return data.search
        .filter(({ urlMap, url }) => (urlMap || url) && !PAGES_TO_FILTER.includes(url))
        .map(({ urlMap, url }) => urlMap || url);
};

module.exports = getPageList;
