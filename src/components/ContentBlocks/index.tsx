import React from 'react'

import {
  BlockQuote,
  BulletList,
  CodeBlock,
  DotImage,
  Heading,
  ListItem,
  OrderedList,
  Paragraph,
  TextNode,
} from './Blocks'

import DotContent from './DotContent'

import { ContentNode } from './type'

/*
  dotCMS Block Editor is a new rich content editor that allows you to create your content as building blocks.
  More info: https://dotcms.com/docs/latest/block-editor
*/

export const ContentBlocks = ({ content }: { content: ContentNode[] }) => {
  return (
    <>
      {content?.map((data, index) => {
        switch (data.type) {
          case 'paragraph':
            return (
              <Paragraph key={index}>
                <ContentBlocks content={data.content} />
              </Paragraph>
            )

          case 'heading':
            return (
              <Heading key={index} level={data.attrs.level}>
                <ContentBlocks content={data.content} />
              </Heading>
            )

          case 'bulletList':
            return (
              <BulletList key={index}>
                <ContentBlocks content={data.content} />
              </BulletList>
            )

          case 'orderedList':
            return (
              <OrderedList key={index}>
                <ContentBlocks content={data.content} />
              </OrderedList>
            )

          case 'dotImage':
            return <DotImage key={index} {...data} />

          case 'horizontalRule':
            return <hr key={index} />

          case 'blockquote':
            return (
              <BlockQuote key={index}>
                <ContentBlocks content={data.content} />
              </BlockQuote>
            )

          case 'codeBlock':
            return (
              <CodeBlock attrs={data.attrs as { language: string }} key={index}>
                <ContentBlocks content={data.content} />
              </CodeBlock>
            )

          case 'hardBreak':
            return <br key={index} />

          case 'text':
            return <TextNode key={index} {...data} />

          case 'listItem':
            return (
              <ListItem key={index}>
                <ContentBlocks content={data.content} />
              </ListItem>
            )

          case 'dotContent':
            return <DotContent key={index} {...data} />

          case 'default':
            if (process.env.NODE_ENV === 'development') {
              return <p>Block not supported: {data.type}</p>
            }
            return <></>
        }
      })}
    </>
  )
}
