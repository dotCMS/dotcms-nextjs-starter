// Internals
import { ProductList } from '@/components'

// TODO: add correct types with GraphQL-Codegen
export type StoreProductListProps = any

export const StoreProductList = (props: StoreProductListProps) => {
  return <ProductList {...props} />
}

export default StoreProductList
