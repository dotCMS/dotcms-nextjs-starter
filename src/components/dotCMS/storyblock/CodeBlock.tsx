import React from 'react'
import TextNode from './TextNode'
import { StoryNode } from './type'

export const CodeBlock = ({ attrs: { language }, content }: StoryNode) => {
  return (
    <pre
      className={language}
      style={{
        background: '#000',
        color: '#fff',
        borderRadius: '5px',
        padding: '10px',
      }}
    >
      <code>
        <TextNode {...content} />
      </code>
    </pre>
  )
}

export default CodeBlock
