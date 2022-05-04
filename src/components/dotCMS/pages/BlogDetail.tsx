// Internals
import { SinglePageDetail, ContentBlocks } from '@/components'
import { DotCMSDetailPageProps } from './type'

export function BlogDetail({
  pageRender: { urlContentMap: data },
}: DotCMSDetailPageProps) {
  const { blogContent } = data

  return (
    <SinglePageDetail {...data}>
      <ContentBlocks content={blogContent.content} />
    </SinglePageDetail>
  )
}

export default BlogDetail
