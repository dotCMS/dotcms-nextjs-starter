// Dependencies
import * as React from 'react'

const getTagsListForCategory = async (category: string) => {
  const data = {
    query: {
      query_string: {
        query: `+contentType:product +categories:${category}`,
      },
    },
    aggs: {
      tag: {
        terms: {
          field: 'tags',
          size: 100,
        },
      },
    },
    size: 0,
  }

  const options = {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const results = await fetch(`/api/es/search`, options)

  const {
    esresponse: [
      {
        aggregations: {
          'sterms#tag': { buckets },
        },
      },
    ],
  } = await results.json()

  return buckets
}

export function useTagsList(category: string) {
  const [tagsList, setTagsList] = React.useState([])

  React.useEffect(() => {
    ;(async function getTags() {
      const tags = await getTagsListForCategory(category)

      setTagsList(tags)
    })()
  }, [category])

  return tagsList
}

export default useTagsList
