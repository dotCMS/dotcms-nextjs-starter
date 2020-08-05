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
    BannerCarousel,
    forms
} from '../../components/dotcms/content-types';

const components = {
    Activity,
    ActivityDetail,
    Banner,
    BannerCarousel,
    BlogDetail,
    CategoryFilter,
    Image,
    Product,
    ProductDetail,
    SimpleWidget,
    StoreProductList,
    Video,
    calendarEventDetail,
    forms,
    webPageContent
};

/**
 * Get the component to render base on the contentlet content type
 *
 */
const getComponent = ({ baseType, contentType }) => {
    const FALLBACK_COMPONENT = baseType === 'WIDGET' ? 'SimpleWidget' : 'webPageContent';

    return components[contentType] || components[FALLBACK_COMPONENT];
};

export default getComponent;
