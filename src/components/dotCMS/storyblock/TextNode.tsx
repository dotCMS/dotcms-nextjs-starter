import React from 'react'
import { StoryNode } from './type'
import { Link, Bold, Italic, Strike, Underline } from './utils/Marks'

// TODO: Talk to Freddy about `marks` because they can also be added to styles.
const nodeMarks = {
  link: Link,
  bold: Bold,
  underline: Underline,
  italic: Italic,
  strike: Strike,
}

export const TextNode = (props: StoryNode) => {
  const { marks = [], text } = props
  const mark = marks[0] || { type: '' }
  const newProps = { ...props, marks: marks.slice(1) }
  const Component = nodeMarks[mark?.type]

  return (
    <>
      {Component ? (
        <>
          <Component>
            <TextNode {...newProps} />
          </Component>
        </>
      ) : (
        <>{text}</>
      )}
    </>
  )
}

export default TextNode
