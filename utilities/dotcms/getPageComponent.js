import {
    ProductDetail,
    calendarEventDetail,
    BlogDetail,
    ActivityDetail
} from '../../components/dotcms/content-types';

const components = {
    ProductDetail,
    calendarEventDetail,
    BlogDetail,
    ActivityDetail
};

/**
 * Get the component to render a especific detail page
 * 
 */
const getPageComponent = (contentType) => components[`${contentType}Detail`] || null;

export default getPageComponent;
