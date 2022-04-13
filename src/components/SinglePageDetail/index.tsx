// Internals
import React from 'react'
import { DotCMSImage } from '@/components'
import { DetailContainer } from './styles'
import { DotSBRender } from '../dotCMS/storyblock'

// TODO: improve the type definition
export type SinglePageDetailProps = {
  pageRender: any
}

export const SinglePageDetail = ({
  pageRender: {
    urlContentMap: { title, blogContent, publishDate, image },
  },
}: SinglePageDetailProps): JSX.Element => {
  const blogContentJSON = blogContent ? JSON.parse(blogContent) : null
  return (
    <DetailContainer className="container">
      <div className="image">
        <DotCMSImage alt={title} path={image} />
      </div>
      <h2 className="title">{title}</h2>
      <span className="date">{new Date(publishDate).toDateString()}</span>
      {blogContentJSON && (
        <div>
          <DotSBRender {...blogContentJSON} />
        </div>
      )}
    </DetailContainer>
  )
}
export default SinglePageDetail
