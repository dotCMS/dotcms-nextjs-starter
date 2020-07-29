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
    },
    isDefaultLanguage() {
        return this.getCurrentLanguage() === process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
    }
};



module.exports = {
  setCurrentLanguage: locale.setCurrentLanguage,
  getCurrentLanguage: locale.getCurrentLanguage,
  removeCurrentLanguage: locale.removeCurrentLanguage,
  isDefaultLanguage: locale.isDefaultLanguage.bind(locale)
}