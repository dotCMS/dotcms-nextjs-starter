const isWindow = typeof localStorage !== 'undefined';

const locale = {
    setCurrentLanguage(language, key = 'dotcms_language') {
        return isWindow && localStorage.setItem(key, language);
    },
    getCurrentLanguage(key = 'dotcms_language') {
        return isWindow && localStorage.getItem(key);
    },
    removeCurrentLanguage(key = 'dotcms_language') {
        return isWindow && localStorage.removeItem(key);
    }
};

export const setLocaleHref = ({ as, url = '', defaultLang }) => {
    // If we have a selected language and the language is not the default lang
    const currentLang = locale.getCurrentLanguage();

    if (currentLang && currentLang !== defaultLang) {
        /**
         * if `url` is passed then return { as, url } to build the tags route
         *
         * @param {string} as e.g. '/store/category/[slug]'
         * @param {string} url The path that we need to pass `/products/hello-world`
         * @param {string} selectedLang The current selected language
         */
        if (url.length > 0) {
            return { as: currentLang + as, url: currentLang + url };
        }

        // Otherwise just return the selected language concatenated with the path
        return currentLang + as;
    } else {
        
        // Default return value is the path passed to the function `as`
        return as;
    }
};

module.exports = {
    setCurrentLanguage: locale.setCurrentLanguage,
    getCurrentLanguage: locale.getCurrentLanguage,
    removeCurrentLanguage: locale.removeCurrentLanguage,
    setLocaleHref
};
