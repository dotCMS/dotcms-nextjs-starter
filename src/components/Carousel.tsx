// Dependencies
import { CarouselContainer } from '../styles/products/product.styles'
import Slider from './Slider'

const Carousel = ({ images, identifier, title }) => (
  <CarouselContainer aria-label="Gallery" className="carousel">
    <Slider id={identifier} images={images} title={title} />
  </CarouselContainer>
)

export default Carousel
