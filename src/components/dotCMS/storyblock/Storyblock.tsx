// Internals
import {
  Paragraph,
  Heading,
  BulletList,
  OrderedList,
  CodeBlock,
  BlockQuote,
  HorizontalRule,
  DotContent,
  DotImage,
} from './index'
import { StoryblockType } from './type'

const components = {
  paragraph: Paragraph,
  heading: Heading,
  bulletList: BulletList,
  orderedList: OrderedList,
  codeBlock: CodeBlock,
  dotContent: DotContent,
  dotImage: DotImage,
  horizontalRule: HorizontalRule,
  blockquote: BlockQuote,
}

const FallbackComponent = ({ type }: { type: string }) => {
  return (
    <h3>
      You don&apos;t have a storyblock component for the content type: {type}
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
