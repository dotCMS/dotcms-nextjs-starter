import TextNode from './TextNode'
import { StoryNode } from './type'

export const Paragraph = ({ content }: StoryNode) => {
  return (
    <p>
      <TextNode {...content} />
    </p>
  )
}

export default Paragraph
