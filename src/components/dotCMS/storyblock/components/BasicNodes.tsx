import React from 'react'

// Nodes
const HardBreak = () => <br />
const HorizontalRule = () => <hr />
const ListItem = ({ children }) => <li>{children}</li>
const OrderedList = ({ children }) => <ol>{children}</ol>
const Paragraph = ({ children }) => <p>{children}</p>
const UnorderedList = ({ children }) => <ul>{children}</ul>

const Heading: any = ({ attrs, children }) => {
  const Tag = `h${attrs.level}` as keyof JSX.IntrinsicElements
  return <Tag>{children}</Tag>
}

const BlockQuote = ({ children }) => (
  <blockquote className="m-4 pl-4 border-solid border-l-4 border-gray-300">
    {children}
  </blockquote>
)
const CodeBlock = ({ attrs: { language }, children }) => (
  <pre
    className="bg-black text-white p-2.5 rounded-md"
    data-language={language}
  >
    <code>{children}</code>
  </pre>
)

export const BasicNodes = {
  paragraph: Paragraph,
  heading: Heading,
  listItem: ListItem,
  bulletList: UnorderedList,
  orderedList: OrderedList,
  codeBlock: CodeBlock,
  blockquote: BlockQuote,
  horizontalRule: HorizontalRule,
  hardBreak: HardBreak,
}
