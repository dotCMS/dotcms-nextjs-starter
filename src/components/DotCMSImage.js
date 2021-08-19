import Image from 'next/image'

const DotCMSImage = ({
  width,
  height,
  alt,
  path,
  identifier,
  name,
  className,
}) => {
  const filterUrl = `/filter/resize_w/${width || height || 1000}/20q`
  let srcUrl = ''

  if (path) {
    srcUrl += `${path}`
  }

  if (identifier && name) {
    srcUrl += `/dA/${identifier}/${name}`
  }

  const src = `${srcUrl}${filterUrl}`

  let props = {
    src,
    alt,
  }

  if (width && height) {
    props.width = width
    props.height = height
  } else {
    props.layout = 'fill'
  }

  const myLoader = ({ src }) => {
    return `${process.env.NEXT_PUBLIC_DOTCMS_HOST}${src}`
  }

  return <Image alt={alt} className={className} {...props} loader={myLoader} />
}

export default DotCMSImage
