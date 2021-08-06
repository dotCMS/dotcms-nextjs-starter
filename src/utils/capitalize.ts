/**
 * A utility for capitalizing strings.
 *
 * @param {string} str - The string to capitalize.
 * @param {boolean} lcfirst - Whether to lowercase the string.
 */
export function capitalize(str: string, lowercase = false): string {
  return (lowercase ? str.toLowerCase() : str).replace(
    /(?:^|\s|["'([{])+\S/g,
    (match) => match.toUpperCase()
  )
}
