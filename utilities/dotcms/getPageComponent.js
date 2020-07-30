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

const getPageComponent = (contentType) => components[`${contentType}Detail`] || null;
export default getPageComponent;
