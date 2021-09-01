// Dependencies
import Image from 'next/image'
import type { ImageProps } from 'next/image'

export type DotCMSImageProps = Omit<ImageProps, 'src'> & {
  path?: string
  identifier?: string
  name?: string
}

export const DotCMSImage = ({
  alt,
  path,
  identifier,
  name,
  className,
  ...props
}: DotCMSImageProps) => {
  const filterUrl = `/filter/resize_w/${
    props.width || props.height || 1000
  }/20q`
  let srcUrl = ''

  if (path) {
    srcUrl += `${path}`
  }

  if (identifier && name) {
    srcUrl += `/dA/${identifier}/${name}`
  }

  const src = `${srcUrl}${filterUrl}`

  if (props.width && props.height) {
    props.width = props.width
    props.height = props.height
  } else {
    props.layout = 'fill'
  }

  const dotCmsLoader = ({ src, width }) => {
    return `${process.env.NEXT_PUBLIC_DOTCMS_HOST}${src}?w=${width}`
  }

  // @ts-ignore - TODO: fix this type searching more accurately
  // type src is incompatible with `StaticImport`
  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      loader={dotCmsLoader}
      src={src as any}
    />
  )
}

export default DotCMSImage
