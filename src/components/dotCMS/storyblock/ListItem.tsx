import React from 'react'
import TextNode from './TextNode'
import { StoryNode } from './type'

export const ListItem = ({ content }: StoryNode) => {
  return (
    <li>
      <TextNode {...content[0]} />
    </li>
  )
}

export default ListItem
