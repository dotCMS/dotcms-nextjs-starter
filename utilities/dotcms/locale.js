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



module.exports = {
  setCurrentLanguage: locale.setCurrentLanguage,
  getCurrentLanguage: locale.getCurrentLanguage,
  removeCurrentLanguage: locale.removeCurrentLanguage
}