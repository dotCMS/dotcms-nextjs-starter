import TextNode from './TextNode'
import { StoryNode } from './type'

export const Heading: any = ({ attrs, content }: StoryNode) => {
  const Tag = `h${attrs.level}` as keyof JSX.IntrinsicElements
  return (
    <Tag>
      <TextNode {...content} />
    </Tag>
  )
}

export default Heading
