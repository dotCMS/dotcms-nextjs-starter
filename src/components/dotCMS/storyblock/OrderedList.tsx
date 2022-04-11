import React from 'react'
import ListItem from './ListItem'
import { StoryNode } from './type'

// Internals
export const OrderedList: any = ({ content }: StoryNode) => {
  return (
    <ol>
      {content.map((data, index) => {
        const paragraphNode = data.content[0]
        // TODO: Find a better way to add key
        return <ListItem key={index} {...paragraphNode} />
      })}
    </ol>
  )
}

export default OrderedList
