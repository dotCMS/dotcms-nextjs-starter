import {
    Banner,
    SimpleWidget,
    StoreProductList,
    webPageContent,
    ProductDetail,
    CategoryFilter,
    Activity,
    Image,
    Video,
    Product,
    calendarEventDetail,
    BlogDetail,
    ActivityDetail,
} from '../../components/dotcms/content-types';

export const mapContentTypes = (contentType) => {

    const components = {
        Banner,
        SimpleWidget,
        webPageContent,
        StoreProductList,
        ProductDetail,
        calendarEventDetail,
        BlogDetail,
        ActivityDetail,
        CategoryFilter,
        Activity,
        Video,
        Image,
        Product
    };

    if (process.env.NODE_ENV === 'dev' && typeof (components[contentType] === 'undefined')) {
        throw new Error(`The component ${contentType} does not exist.`);
    }

    return components[contentType];
};

export const getComponent = (contentType) =>
           mapContentTypes(contentType) || mapContentTypes('webPageContent');
