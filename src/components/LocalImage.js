import Image from 'next/image'

export const LocalImage = (props) => {

  const myLoader = ({ src }) => {
    return `${process.env.NEXT_PUBLIC_DEPLOY_URL}${src}`
  }

  return <Image alt={props.alt} {...props} loader={myLoader} />
}