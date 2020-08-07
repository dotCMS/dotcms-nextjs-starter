/**
 * Get the page URL to prefix with the language when needs
 */

const getPageUrl = async (slug, hasLanguages) => {
    let category;
    const [_, ...tail] = slug || [];

    // If the URL has a language then join the rest of the slug array: `tail`
    // Otherwise join the slug array

    let url = slug ? (hasLanguages ? `/${tail.join('/')}` : `/${slug.join('/')}`) : '/index';

    // If slug includes the term `category` then we're in a category and we need to build our URL
    if (slug?.includes('category')) {
        [category] = slug.slice(-1)[0].split('-');
        url = `/store/category/${category}`;
    }

    return url;
};

export default getPageUrl;
