import loadable from '@loadable/component';
const Activity = loadable(() => import('../content-types/Activity'))  ;
const Banner  = loadable(() => import('../content-types/Banner')) ;
const BannerCarouselWidget = loadable(() => import('../content-types/BannerCarousel/BannerCarouselWidget'));
const calendarEvent = loadable(() => import('../content-types/calendarEvent'))  ;
const Form  = loadable(() => import('../content-types/Form')) ;
const Image  = loadable(() => import('../content-types/Image')) ;
const Product = loadable(() => import('../content-types/Product'))  ;
const SimpleWidget = loadable(() => import('../content-types/SimpleWidget')) ;
const Video  = loadable(() => import('../content-types/Video'));
const webPageContent = loadable(() => import('../content-types/webPageContent'));
const StoreProductList = loadable(() => import('../content-types/StoreProductList'));

export const mapContentTypes = (contentType) => {
  const components = {
      Activity,
      Banner,
      BannerCarousel: BannerCarouselWidget,
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
