import React from 'react'
import ListItem from './ListItem'
import { StoryNode } from './type'

// Internals
export const BulletList: any = ({ attrs, content }: StoryNode) => {
  return (
    <ul>
      {content.map((data, index) => {
        const paragraphNode = data.content[0] as StoryNode
        // TODO: Find a better way to add key
        return <ListItem key={index} {...paragraphNode} />
      })}
    </ul>
  )
}

export default BulletList
