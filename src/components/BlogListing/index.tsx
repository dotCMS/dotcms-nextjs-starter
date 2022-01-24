// Internals
import { CustomDate, Link } from '@/components'
import DotCMSImage from '../dotCMS/Image'

// Types
import { BlogListingProps } from './types';

export const BlogListing = ({ posts }: BlogListingProps) => {

  return posts.map(({ title, postingDate, identifier, urlTitle, image }) => (
    <div className="unit unit-spacing-lg" key={identifier}>
      <div className="unit-left">
        <Link href={`/blog/post/${urlTitle}`}>
          <DotCMSImage alt={title} height="300" identifier={identifier} name={image.name} width="450"/>
        </Link>
      </div>
      <div className="unit-body">
        <h6>
          <Link href={`/blog/post/${urlTitle}`}>{title}</Link>
        </h6>
        {postingDate ? <CustomDate value={postingDate} /> : ''}
      </div>
    </div>
  ))
}

export default BlogListing
