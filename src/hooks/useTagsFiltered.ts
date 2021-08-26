// Dependencies
import * as React from 'react'
import { useRouter } from 'next/router'

// Internals
import { getLocaleHref } from '@/lib/dotCMS'

export function useTagsFiltered(): [
  string[],
  React.Dispatch<React.SetStateAction<string>>,
  string[],
  string
] {
  // Find the category and tags from the URL
  const router = useRouter()
  let { asPath: path } = router
  path = path.split('/').pop() || ''

  const [routePath, setRoutePath] = React.useState('')

  React.useEffect(() => {
    const route = getLocaleHref({
      url: '/store/category/[slug]',
      as: routePath,
    })

    if (typeof route === 'object') {
      routePath && router.push(route.url, route.as)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routePath])

  // Separate category from tags
  let [_, ...tagsFiltered] = path.split('-')

  tagsFiltered = tagsFiltered.map((tag) => {
    const regex = /%20/
    return regex.test(tag) ? tag.replace(regex, ' ') : tag
  })

  const tagsMap =
    tagsFiltered && tagsFiltered.map((tag) => `Product.tags:${tag}`)

  return [tagsFiltered, setRoutePath, tagsMap, routePath]
}

export default useTagsFiltered
