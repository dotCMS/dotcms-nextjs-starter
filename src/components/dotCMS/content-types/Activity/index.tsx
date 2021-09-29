// Internals
import { DotCMSImage, Editable, Link } from '@/components'
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
    <Link className="block py-2 no-underline" href={myHref}>
      <div className="mx-auto overflow-hidden rounded-full w-44 h-44">
        <DotCMSImage alt={title} height={370} path={imageUrl} width={370} />
      </div>
      <div className="mt-4">
        <Editable
          element={
            <h4 className="mb-4 text-2xl text-center text-primary">{title}</h4>
          }
          field="title"
          inode={inode}
          lang="1"
          mode="minimal"
        />
        <Editable
          element={<p className="text-center line-clamp-4">{desc}</p>}
          field="description"
          inode={inode}
          lang="1"
          mode="minimal"
        />
      </div>
    </Link>
  )
}

export default Activity
