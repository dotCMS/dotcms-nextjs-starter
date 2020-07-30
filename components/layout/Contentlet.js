import { mapContentTypes, getComponent } from '../../utilities/dotcms/mapContentTypes';

export const Contentlet = ({ data }) => {
    let Component;

    if (data.baseType === 'WIDGET' && !mapContentTypes(data.contentType)) {
        Component = getComponent('SimpleWidget');
    } else {
        Component = getComponent(data.contentType);
    }

    return <Component {...data} />;
};
