// Dependencies
import { domToReact } from 'html-react-parser'
import { nanoid } from 'nanoid'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import type { Element } from 'html-react-parser'

// Internals
import { htmlParser } from '@/utils'
import { CarouselContainer } from './styles'

export const BannerCarousel = ({ rendered }) => {
  const replace = (node: Element) => {
    const { class: className } = node.attribs

    if (className === 'carousel-inner') {
      return (
        <Carousel key={nanoid()} showThumbs={false}>
          {domToReact(node.children) as JSX.Element[]}
        </Carousel>
      )
    }

    if (
      className === 'carousel-control-prev' ||
      className === 'carousel-control-next'
    ) {
      return null
    }
  }

  return (
    <CarouselContainer>
      {htmlParser({
        content: rendered,
        options: {
          replace,
        },
      })}
    </CarouselContainer>
  )
}

export default BannerCarousel
