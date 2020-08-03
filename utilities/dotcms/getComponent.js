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
    BannerCarousel
} from '../../components/dotcms/content-types';

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
    Product,
    BannerCarousel
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
