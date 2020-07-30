
const CustomError = require('../custom-error');
const dotCMSApi = require('../../config/dotcmsApi');
const getLanguages = require('./getLanguages');
const getPage = require('./getPage');
const getPathsArray = require('./getPathsArray');
const getNav = require('./getNav');



function emitRemoteRenderEdit(url) {
    console.log('emitting event');
    dotCMSApi.event.emit({
        name: 'remote-render-edit',
        data: { pathname: url }
    });
}


const getLanguagesProps = async (selectedLanguage = '') => {
    // Fetch list of languages supported in the DotCMS instance so we can inject the data into the static pages
    // and map to a clean array of ISO compatible lang codes.
    const languages = await getLanguages();

    // This will be coming from the API
    const __DEFAULT_LANGUAGE__ = 'en';

    // Returns either true or false if `selectedLanguage` in a valid language from our languages array
    let hasLanguages = languages
        .map((language) => language.languageCode)
        .filter((language) => language !== __DEFAULT_LANGUAGE__)
        .includes(selectedLanguage);

    // If the hasLanguages predicate returns true find the language in the languages array and pass it in `getPage` call
    const languageId = hasLanguages
        ? languages.find((lang) => lang.languageCode === selectedLanguage).id
        : '1';

    return new Promise((resolve) => {
        let results = {
            hasLanguages,
            languageId,
            languages,
            defaultLanguage: __DEFAULT_LANGUAGE__
        };

        resolve(
            hasLanguages
                ? {
                      ...results,
                      selectedLanguage
                  }
                : results
        );
    });
};

module.exports = {
    CustomError,
    getPage,
    getNav,
    emitRemoteRenderEdit,
    getPathsArray,
    getLanguages,
    getLanguagesProps
};
