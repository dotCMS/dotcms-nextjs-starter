import DotCMSApi from './dotcms.api';

export const getCurrentSite = () => {
  return DotCMSApi.request({
    url: '/api/v1/site/currentSite',
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => data.entity);
};
