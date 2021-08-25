// Dependencies
import gql from 'graphql-tag'

export const PRODUCTS_QUERY = gql`
  query PRODUCTS_QUERY($limit: Int, $query: String) {
    ProductCollection(limit: $limit, query: $query) {
      title
      retailPrice
      salePrice
      urlTitle
      identifier
      tags
      modDate
      host {
        hostName
      }
      image {
        idPath
      }
      image2 {
        idPath
      }
      image3 {
        idPath
      }
      category {
        name
        key
      }
    }
  }
`
