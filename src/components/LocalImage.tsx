// Dependencies
import Image from 'next/image'
import type { ImageProps } from 'next/image'

export const LocalImage = (props: ImageProps) => {
  const myLoader = ({ src }) => {
    return `${process.env.NEXT_PUBLIC_DEPLOY_URL}${src}`
  }

  return <Image alt={props.alt} {...props} loader={myLoader} />
}

export default LocalImage
