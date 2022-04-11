import Image from 'next/image'
import React, { useState } from 'react'

export const DotThumbnail = (contentlet) => {
  const [loadImage, setLoadImage] = useState(isImage(contentlet))
  return (
    <>
      {loadImage ? (
        <Image
          alt={contentlet.titleImage}
          height={94}
          onError={() => setLoadImage(false)}
          src={getImageURL(contentlet)}
          width={94}
        />
      ) : (
        // TODO: Add icon
        <span>Icon</span>
      )}
    </>
  )
}

const isImage = ({ hasTitleImage, mimeType }): boolean => {
  let result = false
  // Some endpoints return this property as a boolean
  if (typeof hasTitleImage === 'boolean' && hasTitleImage) {
    result = hasTitleImage
  } else {
    result = hasTitleImage === 'true' || mimeType === 'application/pdf'
  }

  return result
}

const getImageURL = (contentlet): string => {
  return contentlet.mimeType === 'application/pdf'
    ? `/contentAsset/image/${contentlet.inode}/${contentlet.titleImage}/pdf_page/1/resize_w/250/quality_q/45`
    : `/dA/${contentlet.inode}/500w/20q`
}

export default DotThumbnail
