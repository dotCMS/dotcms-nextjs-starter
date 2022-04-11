import React from 'react'
import TextNode from './TextNode'
import { StoryNode } from './type'

export const ListItem = ({ content }: StoryNode) => {
  return (
    <li>
      <TextNode {...content} />
    </li>
  )
}

export default ListItem
