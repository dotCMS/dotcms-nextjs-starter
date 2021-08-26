// Deoendencies
import gql from 'graphql-tag'

// Internals
import { initializeApollo } from '@/lib/apollo'
import { getLanguageProps } from './'

const apolloClient = initializeApollo()
const PAGES_TO_FILTER = [
  '/store/product-line',
  '/store/product-detail',
  '/store/cart',
]

/**
 * Get all the pages from DotCMS GraphQL API and return an array of urls
 */
export const getPageList = async () => {
  let results: string[] = []

  try {
    let localizedResults: string[] = []

    const PAGES_QUERY = gql`
      {
        search(query: "+(urlmap:/* OR (basetype:5 AND path:/*))") {
          urlMap
          ... on PageBaseType {
            url
          }
        }
      }
    `

    const { data } = await apolloClient.query({
      query: PAGES_QUERY,
    })

    // Fetch list of languages available in the DotCMS instance so we can build our static pages for each language
    const { languages, defaultLanguage } = await getLanguageProps()

    results = data.search
      .filter(
        ({ urlMap, url }: { urlMap: string; url: string }) =>
          (urlMap || url) && !PAGES_TO_FILTER.includes(url)
      )
      .map(({ urlMap, url }: { urlMap: string; url: string }) => urlMap || url)

    // If we have more than one language we return the pages with extra languages
    // e.g. `/es/blog/some-post`
    if (languages?.length > 1) {
      languages
        .filter((lang) => lang.languageCode !== defaultLanguage)
        .forEach((language) => {
          results.map((url) => {
            localizedResults.push(`${language.languageCode}${url}`)
          })
        })

      results.concat(localizedResults)
    }

    return results
  } catch ({ graphQLErrors, networkError }) {
    if (networkError) {
      if (networkError.response) {
        throw new Error(
          `[GraphQL Network error]: ${networkError.response.status} ${networkError.response.statusText}`
        )
      }

      throw new Error(`[GraphQL Network error]: ${networkError.message}`)
    }

    if (graphQLErrors) {
      const errors = graphQLErrors
        .map(
          ({
            message,
            locations,
            path,
          }: {
            message: string
            locations: string
            path: string
          }) =>
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
        .join('\n')
      throw new Error(errors)
    }

    throw new Error('GraphQL error')
  }
}

export default getPageList
