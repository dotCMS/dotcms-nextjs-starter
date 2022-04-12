import React from 'react'
import DotCMSImage from '../../Image'
import { StoryNode } from '../type'
import { ImageContainer } from './styles'

export const DotImage = ({ attrs: { textAlign, data } }: StoryNode<any>) => {
  const { asset, title } = data
  const [imgTitle] = title.split('.')

  return (
    <ImageContainer style={{ textAlign: textAlign }}>
      <DotCMSImage path={asset} title={imgTitle} />
    </ImageContainer>
  )
}

export default DotImage
