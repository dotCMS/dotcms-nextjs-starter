// Internals
import { CustomDate, Link, Loading } from '@/components'
import { useDotCMSApi } from '@/hooks'
import { dotCMS } from '@/lib/dotCMS'
import DotCMSImage from './dotCMS/Image'


const BlogListing = () => {
  const [loading, posts] = useDotCMSApi(async () => {
    return dotCMS.esSearch
      .search({
        contentType: 'Blog',
        // @ts-ignore: we dont need the other query params
        queryParams: {
          numberOfResults: '3',
          sortResultsBy: 'modDate',
          sortOrder1: 'desc',
        },
      })
      .then(({ contentlets }) => contentlets)
  })

  if (loading) {
    return <Loading />
  }

  // @ts-ignore: postingDate is not defined on the dotCMS types
  return posts.map(({ title, postingDate, identifier, urlTitle }) => (
    <div className="unit unit-spacing-lg" key={identifier}>
      <div className="unit-left">
        <Link href={`/blog/post/${urlTitle}`}>
          <DotCMSImage alt={title} identifier={identifier} width="70" />
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
