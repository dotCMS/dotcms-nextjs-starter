// Dependencies
import Image from 'next/image'
import type { ImageProps } from 'next/image'

export const LocalImage = (props: ImageProps) => {
  const myLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_DEPLOY_URL}${src}`
  }

  return <Image {...props} alt={props.alt} loader={myLoader} />
}

export default LocalImage
