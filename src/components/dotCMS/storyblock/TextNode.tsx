import React from 'react'
import { StoryNode } from './type'

export const TextNode = ({ marks, text }: StoryNode) => {
  return <>{addMarks(marks, text)}</>
}

// TODO: Talk to Freddy about `marks` because they can also be added to styles.
const addMarks = (tags = [], text) => {
  if (!tags.length) return text

  const tag = tags[0]

  switch (tag.type) {
    case 'link':
      const { href, target } = tag.attrs
      return (
        <a href={href} target={target}>
          {addMarks(tags.slice(1), text)}
        </a>
      )
      break
    case 'bold':
      return <strong>{addMarks(tags.slice(1), text)}</strong>
      break
    case 'italic':
      return <em>{addMarks(tags.slice(1), text)}</em>
      break
    case 'underline':
      return <u>{addMarks(tags.slice(1), text)}</u>
      break
    case 'strike':
      return <s>{addMarks(tags.slice(1), text)}</s>
    default:
      return <>{addMarks(tags.slice(1), text)}</>
  }
}

export default TextNode
