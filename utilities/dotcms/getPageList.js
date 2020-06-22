const fetch = require('isomorphic-fetch');

const getPageList = async () => {
    const NOT_BUILD_THIS_PAGES = ['/store/product-line', '/store/product-detail', '/store/cart'];

    const PAGES_QUERY = {
        query: `{ 
            search(query: "+(urlmap:/store/* OR (basetype:5 AND path:/store/*))") {
                urlMap
                ... on htmlpageasset {
                    url
                }
            }
        }`
    };

    let data = await fetch(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}/api/v1/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        },
        body: JSON.stringify(PAGES_QUERY)
    });

    ({ data } = await data.json());

    const paths = data.search
        .filter(({ urlMap, url }) => urlMap || url)
        .map(({ urlMap, url }) => urlMap || url)
        .filter((url) => !NOT_BUILD_THIS_PAGES.includes(url));

    return paths;
};

export default getPageList;
