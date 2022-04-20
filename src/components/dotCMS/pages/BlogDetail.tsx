// Internals
import { SinglePageDetail } from '@/components'
import { DotSBRender } from '../storyblock/index'
import { DotCMSDetailPageProps } from './type'

export function BlogDetail({
  pageRender: { urlContentMap: data },
}: DotCMSDetailPageProps) {
  const { blogContent } = data
  const blogContentJSON = blogContent ? JSON.parse(blogContent) : null
  return (
    <SinglePageDetail {...data}>
      <DotSBRender {...blogContentJSON} />
    </SinglePageDetail>
  )
}

export default BlogDetail
