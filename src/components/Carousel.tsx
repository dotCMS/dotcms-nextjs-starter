// Dependencies
import { CarouselContainer } from '../styles/products/product.styles'
import Slider from './Slider'

export type CarouselProps = {
  images: Record<string, string>
  identifier: string
  title: string
}

export const Carousel = ({ images, identifier, title }: CarouselProps) => (
  <CarouselContainer aria-label="Gallery" className="carousel">
    <Slider id={identifier} images={images} title={title} />
  </CarouselContainer>
)

export default Carousel
