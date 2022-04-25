import React from 'react'

export const ProductPrice = ({ salePrice, retailPrice }) => {
  const isSalePrice = !!salePrice
  return (
    <div>
      {isSalePrice ? (
        <>
          <span className="text-lg text-dot-purple">${salePrice}</span>
          <span className="mx-1">-</span>
          <span className="text-sm line-through">${retailPrice}</span>
        </>
      ) : (
        <span className="text-lg text-dot-purple">${retailPrice}</span>
      )}
    </div>
  )
}
