import getComponent from '../../../utilities/dotcms/getComponent';

export const Contentlet = ({ data }) => {
    if (data.contentType === 'SimpleWidget') {
        return null;
    }

    let Component = getComponent(data);

    return <Component {...data} />;
};
