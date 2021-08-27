/**
 * Get the locale date format
 *
 * @param date - The instance of Date
 * @param locale - The locale to use
 */
export const getDateLocale = (date: Date, locale = 'en-us') => {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Get the locale time format
 *
 * @param date - The instance of Date
 * @param locale - The locale to use
 */
export const getTimeLocale = (date: Date, locale = 'en-us') => {
  return date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
  })
}
