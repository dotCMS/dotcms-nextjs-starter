// Internals
import { dotCMS, getLicense } from './'

/**
 * Get the page from the DotCMS PageAPI and make extra transformation for easy render
 *
 */
export const getPage = async (url: string, lang: string) => {
  const { isCommunity } = await getLicense()

  if (isCommunity) {
    throw new Error('You need a DotCMS license to use the Layout API')
  }

  return dotCMS.page
    .get({ url, language: lang }, 'render' as any)
    .catch((error) => {
      /* 
                Error coming from the DotCMS server when DotCMS instance is down or not accesible
            */
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        throw new Error('DotCMS: instance is not running or inaccessible')
      }
      /* 
                Error coming from the DotCMS server when the authorization failed
            */
      if (error.code === 401) {
        throw new Error('DotCMS: Invalid Auth Token')
      }

      throw error
    })
}

export default getPage
