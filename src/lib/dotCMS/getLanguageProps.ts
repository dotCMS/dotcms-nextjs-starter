// Dependencies
import type { DotCMSLanguageItem } from 'dotcms/lib/models'

// Internals
import { dotCMS } from './'

/**
 * A wrapper to get all languages from dotCMS
 */
export const getLanguages = async () => {
  return dotCMS.language.getLanguages()
}

export type GetLanguagePropsResult = {
  hasLanguages: boolean
  languageId: string | number
  languages: DotCMSLanguageItem[]
  selectedLanguage?: string
  defaultLanguage: string
}

/**
 * Get all the properties for a language
 *
 * @param language - The language to get the properties for
 */
export const getLanguageProps = async (
  language = ''
): Promise<GetLanguagePropsResult> => {
  /**
   * Fetch list of languages supported in the DotCMS instance
   * so we can inject the data into the static pages
   * and map to a clean array of ISO compatible lang codes.
   */
  const languages = await getLanguages()

  // This will be coming from the API
  const __DEFAULT_LANGUAGE__ = 'en'

  /**
   * Returns either true or false if `language` in a valid
   * language from our languages array
   */
  let hasLanguages = languages
    .map((language) => language.languageCode)
    .filter((language) => language !== __DEFAULT_LANGUAGE__)
    .includes(language)

  /**
   * If the hasLanguages predicate returns true find the language
   * in the languages array and pass it in `getPage` call
   */
  const languageId = hasLanguages
    ? languages?.find((lang) => lang.languageCode === language)?.id
    : '1'

  return new Promise((resolve) => {
    let results = {
      hasLanguages,
      languageId: String(languageId),
      languages,
      defaultLanguage: __DEFAULT_LANGUAGE__,
    }

    resolve(
      hasLanguages
        ? {
            ...results,
            selectedLanguage: language,
          }
        : results
    )
  })
}
