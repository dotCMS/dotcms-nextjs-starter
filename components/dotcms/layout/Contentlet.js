import getComponent from '../../../utilities/dotcms/getComponent';

export const Contentlet = ({ data }) => {
    let Component = getComponent(data);

    return <Component {...data} />;
};
