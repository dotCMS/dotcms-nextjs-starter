import React from 'react'
import { Post } from './types'

// Internals
import { CustomDate, Link } from '@/components'
import DotCMSImage from '../dotCMS/Image'

export const BlogPost = ({
  urlTitle,
  title,
  identifier,
  tags,
  image: { name },
  teaser,
  postingDate,
}: Post) => {
  const tag = tags.length ? tags[0] : null
  return (
    <div className="w-full md:w-2/4 lg:w-1/3 px-4 mb-4" key={identifier}>
      <div className="bg-white h-full flex flex-col">
        <div className="w-full h-60 md:h-48 relative">
          <Link href={`/blog/post/${urlTitle}`}>
            <DotCMSImage
              alt={title}
              className="scale-110 transform transition-transform ease-linear duration-500 hover:scale-100"
              identifier={identifier}
              name={name}
              objectFit={'cover'}
            />
          </Link>
        </div>
        <div className="flex justify-content items-start flex-col flex-1 p-4 relative">
          {tag && (
            <span className="bg-dot-purple rounded p-1 px-2 text-white text-sm font-bold absolute -top-4 left-5">
              {tag}
            </span>
          )}
          <div className="flex-1 w-full my-6">
            <h3 className="font-bold text-xl mb-4 line-clamp">
              <Link href={`/blog/post/${urlTitle}`}>{title}</Link>
            </h3>
            <p className="text-gray-600 line-clamp">{teaser}</p>
          </div>
          <div className="text-gray-600">
            {postingDate ? <CustomDate value={postingDate} /> : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
