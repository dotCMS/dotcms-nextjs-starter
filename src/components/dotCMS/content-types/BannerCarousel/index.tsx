// Dependencies
import { domToReact } from 'html-react-parser'
import { nanoid } from 'nanoid'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import type { HTMLReactParserOptions } from 'html-react-parser'
import type { Element } from 'html-react-parser'

// Internals
import { htmlParser } from '@/utils'
import { CarouselContainer } from './styles'

export type BannerCarouselProps = {
  rendered: string
}

export const BannerCarousel = ({ rendered }: BannerCarouselProps) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      const typedDomNode = domNode as Element
      const attribs = typedDomNode.attribs

      if (attribs?.className === 'carousel-inner') {
        return (
          <Carousel key={nanoid()} showThumbs={false}>
            {domToReact(typedDomNode.children) as JSX.Element[]}
          </Carousel>
        )
      }

      if (
        attribs?.className === 'carousel-control-prev' ||
        attribs?.className === 'carousel-control-next'
      ) {
        return null
      }
    },
  }

  return (
    <CarouselContainer>
      {htmlParser({
        content: rendered,
        options,
      })}
    </CarouselContainer>
  )
}

export default BannerCarousel
