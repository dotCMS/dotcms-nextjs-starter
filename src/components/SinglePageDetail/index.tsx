// Internals
import React from 'react'
import { DotCMSImage } from '@/components'
import { DetailContainer } from './styles'
import Storyblock from '../dotCMS/storyblock/Storyblock'

// TODO: improve the type definition
export type SinglePageDetailProps = {
  pageRender: any
}

export const SinglePageDetail = ({
  pageRender: {
    urlContentMap: { title, body, body1, description, publishDate, image },
  },
}: SinglePageDetailProps): JSX.Element => {
  const blockData = body1 ? JSON.parse(body1) : null
  return (
    <DetailContainer className="container">
      <div className="image">
        <DotCMSImage alt={title} path={image} />
      </div>
      <h2 className="title">{title}</h2>
      <span className="date">{new Date(publishDate).toDateString()}</span>
      {/* This conditional is temporal */}
      {blockData ? (
        <>
          <h1>StoryBlock</h1>
          <Storyblock {...blockData} />
        </>
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: body || description }}
        />
      )}
    </DetailContainer>
  )
}
export default SinglePageDetail
