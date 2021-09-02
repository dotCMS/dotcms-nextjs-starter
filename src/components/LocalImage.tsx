// Dependencies
import Image from 'next/image'
import type { ImageProps } from 'next/image'

export const LocalImage = (props: ImageProps) => {
  const myLoader = ({ src, width }: { src: string, width: number }) => {
    return `${process.env.NEXT_PUBLIC_DEPLOY_URL}${src}?w=${width}`
  }

  return <Image {...props} alt={props.alt} loader={myLoader} />
}

export default LocalImage
