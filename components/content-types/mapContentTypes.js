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
      StoreProductList
  };

  return components[contentType];
};

export const getComponent = (contentType) => mapContentTypes(contentType) || mapContentTypes('webPageContent');
