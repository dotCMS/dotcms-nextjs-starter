const dotCMSApi = require('../config/dotcmsApi')

import useDotCMSApi from '../hooks/useDotCMSApi'
import RouterLink from './RouterLink'
import DotCMSImage from './DotCMSImage'
import CustomDate from './CustomDate'

// Internals
import { Loading } from '@/components'

const BlogListing = () => {
  const [loading, posts] = useDotCMSApi(() => {
    return dotCMSApi.esSearch
      .search({
        contentType: 'Blog',
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

  return posts.map(({ title, postingDate, identifier, urlTitle }) => (
    <div className="unit unit-spacing-lg" key={identifier}>
      <div className="unit-left">
        <RouterLink href={`/blog/post/${urlTitle}`}>
          <DotCMSImage alt={title} identifier={identifier} width="70" />
        </RouterLink>
      </div>
      <div className="unit-body">
        <h6>
          <RouterLink href={`/blog/post/${urlTitle}`}>{title}</RouterLink>
        </h6>
        {postingDate ? <CustomDate value={postingDate} /> : ''}
      </div>
    </div>
  ))
}

export default BlogListing
