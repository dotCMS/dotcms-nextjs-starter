import Activity from '../content-types/Activity';
import Banner from '../content-types/Banner';
import Image from '../content-types/Image';
import Product from '../content-types/Product';
import SimpleWidget from '../content-types/SimpleWidget';
import Video from '../content-types/Video';
import calendarEvent from '../content-types/calendarEvent';
import webPageContent from '../content-types/webPageContent';

const map = {
    Activity: Activity,
    Banner: Banner,
    Image: Image,
    Product: Product,
    Video: Video,
    WIDGET: SimpleWidget,
    calendarEvent: calendarEvent,
    webPageContent: webPageContent
};

const getComponent = contentType => map[contentType] || webPageContent;

export default function Contentlet({ data }) {
    let Component;

    if (data.baseType === 'WIDGET') {
        Component = map['WIDGET'];
    } else {
        Component = getComponent(data.contentType);
    }

    return <Component {...data} />;
}
