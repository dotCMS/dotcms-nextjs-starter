// Internals
import { TextNode, BasicNodes, DotContent, DotImage } from './index'
import { StoryNode } from './type'

const components = {
  // Text Node
  text: TextNode,
  // Basic Nodes
  ...BasicNodes,
  // Custom nods
  dotContent: DotContent,
  dotImage: DotImage,
}

const FallbackComponent = ({ type }: { type: string }) => {
  return (
    <span>
      You don&apos;t have a storyblock component for the content type: {type}
    </span>
  )
}

/**
 * Dot Story Block Render
 */
export const DotSBRender = ({ content }: StoryNode) => {
  return (
    <>
      {content?.map((data, index) => {
        const Component = components[data.type] || FallbackComponent
        // console.info(data)
        if (!data?.content?.length) {
          return <Component key={index} {...data} />
        }

        return (
          <Component attrs={data.attrs} key={index}>
            <DotSBRender key={index} {...data} />
          </Component>
        )
      })}
    </>
  )
}

export default DotSBRender
