// Internals
import { ProductItem } from '@/components'

// TODO: add correct types with GraphQL-Codegen
export type ProductProps = any

export const Product = (props: ProductProps) => {
  const [cat] = props.category?.length
    ? props.category.map((item: Record<string, string>) => {
        const [name] = Object.values(item)
        return name
      })
    : ['']
  const { retailPrice, urlTitle, title, salePrice, image, inode } = props

  const data = {
    inode,
    category: cat,
    retailPrice,
    urlTitle,
    title,
    salePrice,
    image: {
      path: image,
      size: 500,
      alt: title,
    },
  }

  return <ProductItem product={data} show="all" />
}

export default Product
