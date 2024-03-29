import React from 'react'

import Link from '@/components/Link'
import { ProductPrice } from './ProductPrice'
import DotCMSImage from '../../dotCMS/Image'

// Types
import { ContentNode, DotContentProps } from '../type'

export const DotContent: any = ({
  attrs: { data },
}: ContentNode<{ data: DotContentProps }>) => {
  const {
    contentType,
    title,
    urlMap,
    description,
    shortDescription,
    urlTitle,
    titleImage,
  } = data
  const isProduct = contentType == 'Product'
  const desc = description || shortDescription
  const link = urlMap || `${contentType}/${urlTitle}`

  return (
    <div className="w-full mb-4 box-border">
      <div className="bg-white border border-solid border-gray-300 flex p-4 flex flex-1 justify-start items-center flex-wrap flex-col lg:flex-row">
        <div className="w-40 h-40 p-3 border border-solid border-gray-300 justify-center items-center relative mb-4 lg:m-0">
          <DotCMSImage alt={titleImage} path={getImageURL({ ...data })} />
        </div>

        <div className="flex-1 max-w-full lg:mx-2 lg:p-2">
          <div className="mb-4 lg:mb-0">
            <div className="mb-4 w-full min-w-full lg:w-24">
              <h3 className="truncate font-bold text-lg mb-2 text-center lg:text-left">
                {title}
              </h3>
            </div>
            <div
              className="text-sm text-gray-500 line-clamp overflow-hidden text-ellipsis leading-6 w-full first:m-0"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </div>
        </div>

        <div className="flex justify-center items-center flex-col w-full lg:w-auto">
          {isProduct && <ProductPrice {...data} />}
          <Link
            className="text-white font-bold uppercase bg-dot-purple py-2 px-4 w-full h-14 mt-2 flex justify-center items-center hover:text-white hover:bg-dot-purple-80 lg:w-36 lg:mt-0"
            href={link}
          >
            {isProduct ? 'Buy' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export const getImageURL = ({ mimeType, titleImage, inode }): string => {
  return mimeType === 'application/pdf'
    ? `/contentAsset/image/${inode}/${titleImage}/pdf_page/1/resize_w/250/quality_q/45`
    : `/dA/${inode}/500w/20q`
}

export default DotContent
