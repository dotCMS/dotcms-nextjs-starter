import TextNode from './TextNode'
// Internals

// SsotyBlock Node <T = unkown>
// Content = T
export const Paragraph = ({ content }) => {
  return (
    <p>
      <TextNode {...content[0]} />
    </p>
  )
}

export default Paragraph
