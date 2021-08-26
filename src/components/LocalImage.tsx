// Dependencies
import Image from 'next/image'
import type { ImageProps } from 'next/image'

export const LocalImage = (props: ImageProps) => {
  const myLoader = ({ src }: { src: string }) => {
    const currentDeployURL = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_DEPLOY_URL

    return `${currentDeployURL}${src}`
  }

  console.warn({
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_DEPLOY_URL: process.env.NEXT_PUBLIC_DEPLOY_URL,
  })

  return <Image {...props} alt={props.alt} loader={myLoader} />
}

export default LocalImage
