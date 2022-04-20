// Internals
import React from 'react'
import { DotCMSImage } from '@/components'
import { DetailContainer } from './styles'

export type SinglePageDetailProps = {
  title: string
  publishDate: number
  image: string
  children: JSX.Element
}

export const SinglePageDetail = ({
  title,
  publishDate,
  image,
  children,
}: any): JSX.Element => {
  return (
    <DetailContainer className="container">
      <div className="image">
        <DotCMSImage alt={title} path={image} />
      </div>
      <h2 className="title">{title}</h2>
      <span className="date">{new Date(publishDate).toDateString()}</span>
      {children}
    </DetailContainer>
  )
}
export default SinglePageDetail
