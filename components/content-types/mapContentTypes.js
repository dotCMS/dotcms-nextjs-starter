import dynamic from 'next/dynamic';
const Activity = dynamic(() => import('../content-types/Activity'));
const Banner = dynamic(() => import('./Banner'));
const calendarEvent = dynamic(() => import('../content-types/calendarEvent'));
const Form = dynamic(() => import('../content-types/Form'));
const Image = dynamic(() => import('../content-types/Image'));
const Product = dynamic(() => import('../content-types/Product'));
const SimpleWidget = dynamic(() => import('../content-types/SimpleWidget'));
const Video = dynamic(() => import('../content-types/Video'));
const StoreProductList = dynamic(() => import('../content-types/StoreProductList'), {ssr: false});
const webPageContent = dynamic(() => import('../content-types/webPageContent'));
const ProductSingle = dynamic(() => import('../content-types/ProductSingle'));
const CategoryFilter = dynamic(() => import('../content-types/CategoryFilter'));

export const mapContentTypes = (contentType) => {
  const components = {
      Activity,
      Banner,
      calendarEvent,
      forms: Form,
      Image,
      Product,
      SimpleWidget,
      Video,
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

export const getComponent = (contentType) => mapContentTypes(contentType) || mapContentTypes('webPageContent');
