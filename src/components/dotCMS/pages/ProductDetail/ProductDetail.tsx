// Dependencies
import * as React from 'react'

// Internals
import { Carousel, Editable } from '@/components'
import {
  ProductContainer,
  ProductDetailContainer,
  Price,
  Quantity,
} from '@/styles/products/product.styles'
import { Button } from '@/styles/shared.styles'
import { currencyFormatter } from '@/utils'
import { Content } from './styles'

export type ProductDetailProps = {
  pageRender: Record<string, any>
}

export function ProductDetail({
  pageRender: { urlContentMap },
}: ProductDetailProps) {
  const {
    inode,
    title,
    description,
    retailPrice,
    salePrice,
    identifier,
    image,
    image2,
    image3,
    specifications1,
  } = urlContentMap

  const imagesFound = () => {
    return !!image || !!image2 || !!image3
  }

  const renderSpecs = () => {
    // Removes tab character that may come from the API and parses the object
    try {
      const specifications = JSON.parse(specifications1.replace(/\t+/g, ''))
      const specsArr = []
      for (var key in specifications) {
        specsArr.push(
          <li key={key}>
            <b>{key}</b>: {specifications[key]}
          </li>
        )
      }
      return specsArr
    } catch {
      return []
    }
  }

  return (
    <ProductContainer className="container">
      {imagesFound() && (
        <Carousel
          identifier={identifier}
          images={{ image, image2, image3 }}
          title={title}
        />
      )}

      <ProductDetailContainer>
        <div className="meta">
          <Editable
            className="meta__title"
            element={<h3>{title}</h3>}
            field="title"
            inode={inode}
            lang="1"
            mode="minimal"
          />

          <Price salePrice={!!salePrice}>
            {currencyFormatter.format(retailPrice.replace(/\,/g, ''))}
          </Price>
          {salePrice && <Price>{currencyFormatter.format(salePrice)}</Price>}
        </div>

        <Editable
          className="meta__title"
          element={
            <Content dangerouslySetInnerHTML={{ __html: description }} />
          }
          field="description"
          inode={inode}
          lang="1"
          mode="full"
        />

        {renderSpecs().length > 1 && (
          <>
            <h4>Specifications</h4>
            <ul>{renderSpecs()}</ul>
          </>
        )}

        <label className="visually-hidden" htmlFor="product_quantity">
          Quantity
        </label>
        <Quantity
          id="product_quantity"
          name="product_quantity"
          placeholder="1"
          type="number"
        />
        <Button href="#">Add to cart</Button>
      </ProductDetailContainer>
    </ProductContainer>
  )
}

export default ProductDetail
