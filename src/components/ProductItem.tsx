// Internals
import { DotCMSImage, Editable, Link } from '@/components'
import { SingleProductContainer } from '@/styles/products/product.styles'
import { Price } from '@/styles/products/product.styles'
import { currencyFormatter } from '@/utils'

const shouldIShow = (show: string, item: any) => {
  if (show === 'all') {
    return true
  }

  const shouldShow = show?.split(',')

  return shouldShow?.includes(item)
}

export type ProductItemProps = {
  product: Record<string, any>
  show: string
}

export const ProductItem = ({ product, show }: ProductItemProps) => {
  const { retailPrice, urlTitle, image, title, salePrice, category, inode } =
    product

  return (
    <SingleProductContainer>
      {shouldIShow(show, 'image') && (
        <Link className="image__link" href={`/store/products/${urlTitle}`}>
          <DotCMSImage {...image} loading="lazy" />
        </Link>
      )}

      <div className="meta">
        <h4 className="meta__category">
          <Link href={`/store/category/${category}`}>{category}</Link>
        </h4>
        {shouldIShow(show, 'title') && (
          <h3 className="meta__title">
            <Link href={`/store/products/${urlTitle}`}>
              <Editable
                element={<span>{title}</span>}
                field="title"
                inode={inode}
                lang="1"
                mode="minimal"
              />
            </Link>
          </h3>
        )}

        {shouldIShow(show, 'price') && (
          <>
            <Price salePrice={!!salePrice} small>
              {currencyFormatter.format(retailPrice.replace(/\,/g, ''))}
            </Price>{' '}
            {salePrice && (
              <Price small>{currencyFormatter.format(salePrice)}</Price>
            )}
          </>
        )}
      </div>
    </SingleProductContainer>
  )
}

export default ProductItem
