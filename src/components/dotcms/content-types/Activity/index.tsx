// Internals
import { DotCMSImage, Editable } from '@/components'
import { WapperLink } from './styles'

export type ActivityProps = {
  description: string
  identifier: string
  urlTitle: string
  title: string
  inode: string
}

export const Activity = ({
  description,
  identifier,
  urlTitle,
  title,
  inode,
}: ActivityProps) => {
  const desc =
    description.length > 120 ? description.substring(0, 120) : description

  const imageUrl = `/dA/${identifier}/image/270w/50q`
  const myHref = '/activities/' + urlTitle

  return (
    <WapperLink href={myHref}>
      <DotCMSImage alt={title} height={370} path={imageUrl} width={370} />
      <div className="body">
        <Editable
          element={<h4>{title}</h4>}
          field="title"
          inode={inode}
          lang="1"
          mode="minimal"
        />
        <Editable
          element={<p>{desc}</p>}
          field="description"
          inode={inode}
          lang="1"
          mode="minimal"
        />
      </div>
    </WapperLink>
  )
}

export default Activity
