import Image from 'next/image'

const getSize = (size) => {
  let result = {
    width: 250,
    height: 250,
    filterResize: 250,
  }

  if (size) {
    if (typeof size === 'number') {
      result = {
        width: size,
        filter: size,
      }
    }

    if (typeof size === 'object') {
      result = {
        width: size.width,
        height: size.height,
        filterResize: size.width,
      }
    }
  }

  return result
}

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

  return <Image alt={alt} className={className} {...props} />
}

export default DotCMSImage
