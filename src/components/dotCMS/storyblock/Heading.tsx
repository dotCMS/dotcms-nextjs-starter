import TextNode from './TextNode'

// Internals
export const Heading: any = ({ attrs, content }) => {
  const Tag = `h${attrs.level}` as keyof JSX.IntrinsicElements
  return (
    <Tag>
      <TextNode {...content[0]} />
    </Tag>
  )
}

export default Heading
