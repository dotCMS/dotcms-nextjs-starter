/**
 * Determines if the path ends with /index but only when the / is preceded by a word
 *
 * This is needed to create the right paths for Next.js getStaticPaths' paths array
 * `/destinations/index` becomes `/destinations`
 *
 * @param {string} - the path (e.g /destinations/index)
 */
export const pathEndsWithIndex = (path: string) => {
  const r = /(?<=\w)(\/index)/

  return r.test(path)
}

export const getParamsObjectForPath = (pathArray: string[], path: string) => {
  return {
    params: {
      slug: pathEndsWithIndex(path)
        ? pathArray.splice(0, pathArray.indexOf('index'))
        : pathArray,
    },
  }
}

/**
 * Return the collections of paths to render the static pages in NextJS
 *
 * More info: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export const getPathsArray = (pageList: string[]) => {
  const paths = pageList.reduce((acc: any[], url: string) => {
    let urlArr = url.split('/').filter(Boolean)
    acc = [...acc, getParamsObjectForPath(urlArr, url)]
    return acc
  }, [])

  // Due to how optional catch-all works, we need to pass an empty slug to generate index.html
  return paths.concat({ params: { slug: [''] } })
}
