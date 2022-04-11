// Internals
import {
  Paragraph,
  Heading,
  BulletList,
  OrderedList,
  DotContent,
} from './index'
import { StoryblockType } from './type'

const components = {
  paragraph: Paragraph,
  heading: Heading,
  bulletList: BulletList,
  orderedList: OrderedList,
  dotContent: DotContent,
}

const FallbackComponent = ({ type }: { type: string }) => {
  return (
    <h3>
      You don&apos;t have a storybook component for the content type: {type}
    </h3>
  )
}

/**
 * Get the component to render base on the contentlet content type
 */
export const Storyblock = ({ content }: StoryblockType) => {
  // @ts-ignore we can index by contentType name
  return (
    <>
      {content?.map((data, index) => {
        let Component = components[data.type] || FallbackComponent
        // TODO: Find a better property for keys
        return <Component {...data} key={index} />
      })}
    </>
  )
}

export default Storyblock
