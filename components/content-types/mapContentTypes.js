import {
    Banner,
    SimpleWidget,
    StoreProductList,
    webPageContent,
    ProductSingle,
    CategoryFilter
} from './rootContentTypes';

export const mapContentTypes = (contentType) => {
    const components = {
        Banner,
        SimpleWidget,
        webPageContent,
        StoreProductList,
        ProductSingle,
        CategoryFilter
    };

    if (process.env.NODE_ENV === 'dev' && typeof (components[contentType] === 'undefined')) {
        throw new Error(`The component ${contentType} does not exist.`);
    }

    return components[contentType];
};

export const getComponent = (contentType) =>
    mapContentTypes(contentType) || mapContentTypes('webPageContent');
