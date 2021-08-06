import React from 'react'
import { CarouselContainer } from '../styles/products/product.styles'
import Slider from './Slider'
function Carousel({ images, identifier, title }) {
  return (
    <CarouselContainer aria-label="Gallery" className="carousel">
      <Slider id={identifier} images={images} title={title} />
    </CarouselContainer>
  )
}

export default Carousel
