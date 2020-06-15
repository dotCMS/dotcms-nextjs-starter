import fetch from 'isomorphic-fetch';

const getTagsListForCategory = async (category) => {
  const data = {
      query: {
          query_string: {
              query: `+contentType:product +categories:${category}`
          }
      },
      aggs: {
          tag: {
              terms: {
                  field: 'tags',
                  size: 100
              }
          }
      },
      size: 0
  }

  const options = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  };

  let results = await fetch('https://starter.dotcms.com:8443/api/es/search', options);
  results = await results.json();
  return results.esresponse[0].aggregations['sterms#tag'].buckets
}

module.exports = getTagsListForCategory;