// Internals
import { SinglePageDetail } from '@/components'
import { DotCMSDetailPageProps } from './type'

export function CalendarEventDetail({
  pageRender: { urlContentMap: data },
}: DotCMSDetailPageProps) {
  const { body, description } = data
  return (
    <SinglePageDetail {...data}>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: body || description }}
      />
    </SinglePageDetail>
  )
}

export default CalendarEventDetail
