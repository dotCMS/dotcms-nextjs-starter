// Internals
import { DotCMSImage } from '@/components'
import { DetailContainer } from './styles'

// TODO: improve the type definition
export type SinglePageDetailProps = {
  pageRender: any
}

export const SinglePageDetail = ({
  pageRender: {
    urlContentMap: { title, body, description, publishDate, image },
  },
}: SinglePageDetailProps): JSX.Element => (
  <DetailContainer className="container">
    <div className="image">
      <DotCMSImage alt={title} path={image} />
    </div>
    <h2 className="title">{title}</h2>
    <span className="date">{new Date(publishDate).toDateString()}</span>
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: body || description }}
    />
  </DetailContainer>
)

export default SinglePageDetail
