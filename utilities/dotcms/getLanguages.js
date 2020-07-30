const dotCMSApi = require('../../config/dotcmsApi');

const getLanguages = () => {
    return dotCMSApi.language.getLanguages();
};

export default getLanguages