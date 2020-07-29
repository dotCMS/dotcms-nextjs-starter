const gql = require('graphql-tag');
const { initializeApollo } = require('../../config/apollo');
const apolloClient = initializeApollo();
import { getLanguagesProps } from '../../utilities/dotcms/index';
const PAGES_TO_FILTER = ['/store/product-line', '/store/product-detail', '/store/cart'];

const getPageList = async () => {
    let results = [];
    let localizedResults = [];

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
                ... on LandingPage {
                    url
                }
                ... on ProductLineLandingPage {
                    url
                }
            }
        }
    `;

    const { data } = await apolloClient.query({
        query: PAGES_QUERY
    });

    // Fetch list of languages available in the DotCMS instance so we can build our static pages for each language
    const { languages, defaultLanguage } = await getLanguagesProps();

    results = data.search
        .filter(({ urlMap, url }) => (urlMap || url) && !PAGES_TO_FILTER.includes(url))
        .map(({ urlMap, url }) => urlMap || url);

    // If we have languages and language is not default then for each language build the localized URLs
    // e.g. `/es/blog/some-post`
    if (languages?.length > 0) {
        languages
            .filter((lang) => lang.languageCode !== defaultLanguage)
            .forEach((language) => {
                results.map((url) => {
                    localizedResults.push(`${language.languageCode}${url}`);
                });
            });

        return results.concat(localizedResults);
    }

    return results;
};

module.exports = getPageList;
