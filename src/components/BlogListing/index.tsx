// Types
import { BlogListingProps } from './types'
import { BlogPost } from './BlogPost'

export const BlogListing = ({ posts }: BlogListingProps) => {
  return (
    <div className="flex justify-between flex-wrap items-stretch max-w-6xl mx-auto">
      {posts.map((post) => (
        <BlogPost key={post.identifier} {...post} />
      ))}
    </div>
  )
}

export default BlogListing
