import React from 'react'
import { StoryNode } from './type'

export const TextNode = (data: StoryNode[]) => {
  const nodes = Object.values(data)
  return (
    <>
      {nodes.map(({ type, marks, text }, index) => {
        return type === 'text' ? (
          addMarks(marks, text, index)
        ) : (
          <br key={index} />
        )
      })}
    </>
  )
}

// TODO: Talk to Freddy about `marks` because they can also be added to styles.
const addMarks = (tags = [], text, index?) => {
  if (!tags.length) return text

  const tag = tags[0]

  switch (tag.type) {
    case 'link':
      const { href, target } = tag.attrs
      return (
        <a href={href} key={index} target={target}>
          {addMarks(tags.slice(1), text)}
        </a>
      )
    case 'bold':
      return <strong key={index}>{addMarks(tags.slice(1), text)}</strong>
    case 'italic':
      return <em key={index}>{addMarks(tags.slice(1), text)}</em>
    case 'underline':
      return <u key={index}>{addMarks(tags.slice(1), text)}</u>
    case 'strike':
      return <s key={index}>{addMarks(tags.slice(1), text)}</s>
    default:
      return <>{addMarks(tags.slice(1), text)}</>
  }
}

export default TextNode
