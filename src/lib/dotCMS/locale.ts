const isWindow = typeof localStorage !== 'undefined'

/**
 * Set the language for the whole application using localStorage
 *
 * @param language - The language to set
 * @param key - The key to save the language under
 */
export function setCurrentLanguage(language: string, key = 'dotcms_language') {
  return isWindow && localStorage.setItem(key, language)
}

/**
 * Get the language from localStorage
 *
 * @param key - The key to get the language from
 */
export function getCurrentLanguage(key = 'dotcms_language') {
  return isWindow && localStorage.getItem(key)
}

/**
 * Remove the language from localStorage
 *
 * @param key - The key to remove the language from
 */
export function removeCurrentLanguage(key = 'dotcms_language') {
  return isWindow && localStorage.removeItem(key)
}

type GetLocaleHrefProps = {
  as: string
  url: string
  defaultLang?: string
}

/**
 * If `url` is passed then return { as, url } to build the tags route
 *
 * @param {string} as e.g. '/store/category/[slug]'
 * @param {string} url The path that we need to pass `/products/hello-world`
 * @param {string} selectedLang The current selected language
 */
export const getLocaleHref = ({
  as,
  url = '',
  defaultLang,
}: GetLocaleHrefProps) => {
  // If we have a selected language and the language is not the default lang
  const currentLang = getCurrentLanguage()

  if (currentLang && currentLang !== defaultLang) {
    if (url.length > 0) {
      return { as: currentLang + as, url: currentLang + url }
    }

    // Otherwise just return the selected language concatenated with the path
    return currentLang + as
  } else {
    // Default return value is the path passed to the function `as`
    return as
  }
}
