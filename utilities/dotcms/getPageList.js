const gql = require('graphql-tag');
const { initializeApollo } = require('../../config/apollo');

const PAGES_TO_FILTER = ['/store/product-line', '/store/product-detail', '/store/cart'];

const getPageList = async () => {
    const apolloClient = initializeApollo();
    const PAGES_QUERY = gql`
        {
            search(query: "+(urlmap:/store/* OR (basetype:5 AND path:/store/*))") {
                urlMap
                ... on htmlpageasset {
                    url
                }
            }
        }
    `;

    const { data } = await apolloClient.query({
        query: PAGES_QUERY
    });

    return data.search
        .filter(({ urlMap, url }) => urlMap || url)
        .map(({ urlMap, url }) => urlMap || url)
        .filter((url) => !PAGES_TO_FILTER.includes(url));
};

module.exports = getPageList;