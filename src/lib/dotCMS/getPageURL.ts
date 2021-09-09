/**
 * Get the page URL to prefix with the language when needs
 */
export const getPageUrl = async (slug: string[]): Promise<string> => {
  let category: string[]
  // We need to add "/" before the slug so the page can respond with the HTML
  let url = slug ? `/${slug.join('/')}` : '/'

  // If slug includes the term `category` then we're in a category and we need to build our URL
  if (slug?.includes('category')) {
    category = slug.slice(-1)[0].split('-')
    url = `/store/category/${category}`
  }

  return url
}
