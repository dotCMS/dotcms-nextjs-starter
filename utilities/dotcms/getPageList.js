const gql = require('graphql-tag');
const { initializeApollo } = require('../../config/apollo');

const PAGES_TO_FILTER = ['/store/product-line', '/store/product-detail', '/store/cart'];
const apolloClient = initializeApollo();

const getPageList = async () => {
    const PAGES_QUERY = gql`
        {
            search(query: "+(urlmap:/store/* OR (basetype:5 AND path:/store/*))") {
                urlMap
                ... on htmlpageasset {
                    url
                    folder {
                        folderPath
                    }
                }
            }
        }
    `;

    const { data } = await apolloClient.query({
        query: PAGES_QUERY
    });

    return data.search
        .filter(({ urlMap, url, folder }) => (urlMap || url || folder) && !PAGES_TO_FILTER.includes(url))
        .map(({ urlMap, url, folder }) => {
        	// console.log(folder?.folderPath, url)
        	return {url: urlMap || url}
		})
}

module.exports = getPageList;
