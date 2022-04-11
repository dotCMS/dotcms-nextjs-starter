import React from 'react'
import Paragraph from './Paragraph'
import { StoryNode } from './type'

const BlockQuote = ({ content }): StoryNode => {
  return (
    <blockquote
      style={{
        margin: '1rem',
        paddingLeft: '1rem',
        borderLeft: '3px solid rgba(13,13,13,.1)',
      }}
    >
      {content.map((node, index) => (
        <Paragraph key={index} {...node} />
      ))}
    </blockquote>
  )
}

export default BlockQuote
