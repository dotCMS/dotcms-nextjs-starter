// Internals
import { SinglePageDetail, ContentBlocks } from '@/components'
import { DotCMSDetailPageProps } from './type'

export function BlogDetail({
  pageRender: { urlContentMap: data },
}: DotCMSDetailPageProps) {
  const { blogContent } = data
  const blogContentJSON = blogContent ? JSON.parse(blogContent) : null
  return (
    <SinglePageDetail {...data}>
      <ContentBlocks {...blogContentJSON} />
    </SinglePageDetail>
  )
}

export default BlogDetail
