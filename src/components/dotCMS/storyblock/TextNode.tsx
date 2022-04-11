import React from 'react'
import { StoryNode } from './type'

export const TextNode = (data: StoryNode[]) => {
  const nodes = Object.values(data)
  return (
    <>
      {nodes.map(({ type, marks, text }) => {
        return type === 'text' ? addMarks(marks, text) : <br />
      })}
    </>
  )
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
    case 'bold':
      return <strong>{addMarks(tags.slice(1), text)}</strong>
    case 'italic':
      return <em>{addMarks(tags.slice(1), text)}</em>
    case 'underline':
      return <u>{addMarks(tags.slice(1), text)}</u>
    case 'strike':
      return <s>{addMarks(tags.slice(1), text)}</s>
    default:
      return <>{addMarks(tags.slice(1), text)}</>
  }
}

export default TextNode
