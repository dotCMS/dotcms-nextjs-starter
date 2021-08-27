// Dependencies
import * as React from 'react'

// Internals
import { DotCMSImage } from '@/components'

export type SlideProps = {
  images: Record<string, string>
  title: string
  id: string
}

/**
 * TODO: when we install @graphql-codegen/typescript, we can remove this
 * custom types to use the provided by the generated typescript code
 */
export const Slider = ({ images, title, id }: SlideProps) => {
  const keys = Object.keys(images)
  const values = Object.values(images).filter(Boolean)

  /**
   * Handle the click event on the dots
   *
   * @param elem The element clicked
   */
  const handleNavigatorClick = (elem: HTMLAnchorElement) => {
    elem.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  /**
   * Create the references given an image object
   *
   * @param imgs The image object
   */
  const createRefs = (imgs: Record<string, string>) => {
    const values = Object.values(imgs)
    return values.reduce((acc, value, idx) => {
      // @ts-ignore common problem with accessing the key
      acc[idx] = React.createRef()
      return acc
    }, [])
  }

  const navigatorRefs = createRefs(images)
  const slideRefs = createRefs(images)

  return (
    <>
      {images && (
        <ul className="carousel__viewport">
          {Object.values(images).map((image, index) => {
            const data = {
              identifier: id,
              name: keys[index],
              width: 700,
              height: 700,
              alt: title,
            }

            return (
              image && (
                <li
                  className="carousel__slide"
                  data-slide={index}
                  id={`carousel__slide${index}`}
                  key={index}
                  ref={slideRefs[index]}
                  tabIndex={0}
                >
                  <DotCMSImage loading="lazy" {...data} />
                </li>
              )
            )
          })}
        </ul>
      )}
      <aside className="carousel__navigation">
        <ul className="carousel__navigation-list">
          {values.length > 1 &&
            values.map((_item, index) => {
              return (
                <li className="carousel__navigation-item active" key={index}>
                  <a
                    className="carousel__navigation-button"
                    onClick={(e) => {
                      e.preventDefault()
                      // React.RefObject<HTMLAnchorElement> was giving an error that didnt exist
                      handleNavigatorClick((slideRefs[index] as any)?.current)
                    }}
                    ref={navigatorRefs[index]}
                  />
                </li>
              )
            })}
        </ul>
      </aside>
    </>
  )
}

export default Slider
