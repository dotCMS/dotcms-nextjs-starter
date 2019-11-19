import Activity from '../content-types/Activity';
import Banner from '../content-types/Banner';
import BannerCarouselWidget from '../content-types/BannerCarousel/BannerCarouselWidget';
import calendarEvent from '../content-types/calendarEvent';
import Image from '../content-types/Image';
import Product from '../content-types/Product';
import SimpleWidget from '../content-types/SimpleWidget';
import Video from '../content-types/Video';
import webPageContent from '../content-types/webPageContent';

const map = {
    Activity,
    Banner,
    BannerCarousel: BannerCarouselWidget,
    calendarEvent,
    Image,
    Product,
    SimpleWidget,
    Video,
    webPageContent
};

const getComponent = contentType => map[contentType] || webPageContent;

export default function Contentlet({ data }) {
    let Component;

    if (data.baseType === 'WIDGET' && !map[data.contentType]) {
        Component = map['SimpleWidget'];
    } else {
        Component = getComponent(data.contentType);
    }

    return <Component {...data} />;
}
