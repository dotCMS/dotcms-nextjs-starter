import { mapContentTypes, getComponent } from '../content-types/mapContentTypes';

export const Contentlet = ({ data }) => {
    let Component;

    if (data.baseType === 'WIDGET' && !mapContentTypes(data.contentType)) {
        Component = getComponent('SimpleWidget');
    } else {
        Component = getComponent(data.contentType);
    }
sce

    return <Component {...data} />;
};
