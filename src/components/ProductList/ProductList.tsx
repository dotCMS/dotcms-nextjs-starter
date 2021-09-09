// Dependencies
import * as React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import type { ApolloClient } from '@apollo/react-hooks'

// Internals
import { Loading, TagsFilter } from '@/components'
import { useTagsFiltered, useTagsList } from '@/hooks'
import { useApollo } from '@/lib/apollo'
import { ProductGrid, StatusIndicator } from '@/styles/products/product.styles'
import ProductItem from '../ProductItem'
import { PRODUCTS_QUERY } from './query'

export type ProductListProps = {
  quantity?: number
  show?: boolean
  showTagsFilter?: boolean
  productLine?: any
  width?: number
  height?: number
}

export const ProductList = ({
  quantity,
  show,
  showTagsFilter,
  productLine,
  width,
  height,
}: ProductListProps) => {
  const client = useApollo() as unknown as ApolloClient<any>
  let category: string

  if (productLine) {
    ;[category] = productLine
    category = (Object.values(category)[0] as string).toLowerCase?.()
  }

  // @ts-ignore we can use category at this point
  const tagsList = useTagsList(category)
  const [tagsFiltered, setRoutePath, tagsMap] = useTagsFiltered()

  const getUrl = (category: string, tags: string[]) => {
    const tagsUrl = tags.length > 0 ? `-${tags.join('-')}` : ''
    return `/store/category/${category}${tagsUrl}`
  }

  const query = `+contentType:product ${
    // @ts-ignore we can use category at this point
    category ? `+categories:${category}` : ''
  } ${
    tagsMap && tagsMap.length > 0 ? `+(${(tagsMap as string[]).join(' ')})` : ''
  }`

  const [getData, { loading, data }] = useLazyQuery(PRODUCTS_QUERY, {
    variables: { limit: quantity, query },
    client,
    errorPolicy: 'none',
  })

  React.useEffect(() => {
    // To avoid running the GraphQL query in the server we run it only if we're in client-side
    if (typeof window !== 'undefined') {
      getData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {showTagsFilter && (
        <TagsFilter
          list={tagsList}
          onChange={(tags) => {
            setRoutePath(getUrl(category, tags))
          }}
          selected={tagsFiltered as string[]}
        />
      )}
      {loading ? (
        <Loading />
      ) : data?.ProductCollection?.length === 0 ? (
        <StatusIndicator>No products found!</StatusIndicator>
      ) : (
        <ProductGrid className="product-grid" width={width}>
          {data?.ProductCollection?.map((product: Record<string, any>) => {
            const [category] =
              product.category?.map((item: Record<string, any>) => {
                const [name] = Object.values(item)
                return name
              }) || []
            if (category) {
              const data = {
                ...product,
                category,
                ...{
                  image: {
                    path: product.image.idPath,
                    size: {
                      height,
                      width,
                      alt: product.title,
                    },
                  },
                },
              }

              return (
                <ProductItem
                  key={product.identifier}
                  product={data}
                  show={String(show)}
                />
              )
            }
          })}
        </ProductGrid>
      )}
    </>
  )
}

export default ProductList
