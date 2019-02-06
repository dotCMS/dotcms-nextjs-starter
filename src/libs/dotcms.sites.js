import DotCMSApi from './dotcms.api';

export const getCurrentSite = () => {
    const host = process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_DOTCMS_HOST : '';
    return DotCMSApi.request({
        url: `${host}/api/v1/site/currentSite`,
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => data.entity);
};
