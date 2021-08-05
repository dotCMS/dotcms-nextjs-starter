/*
 * Determines if the path ends with /index but only when the / is preceded by a word
 *
 * This is needed to create the right paths for Next.js getStaticPaths' paths array
 * `/destinations/index` becomes `/destinations`
 *
 * @param {string} str - the path (e.g /destinations/index)
 */
const pathEndsWithIndex = (str) => {
  const r = /(?<=\w)(\/index)/

  return r.test(str)
}

const getParamsObjectForPath = (pathArray, url) => {
  return {
    params: {
      slug: pathEndsWithIndex(url)
        ? pathArray.splice(0, pathArray.indexOf('index'))
        : pathArray,
    },
  }
}

/**
 * Return the collections of paths to render the static pages in NextJS
 * More info: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 *
 */
const getPathsArray = (pageList) => {
  const paths = pageList.reduce((acc, url) => {
    let urlArr = url.split('/').filter(Boolean)
    acc = [...acc, getParamsObjectForPath(urlArr, url)]
    return acc
  }, [])

  // Due to how optional catch-all works, we need to pass an empty slug to generate index.html
  return paths.concat({ params: { slug: [''] } })
}

module.exports = getPathsArray
