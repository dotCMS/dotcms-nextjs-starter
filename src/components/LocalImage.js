import Image from 'next/image'

export const LocalImage = (props) => {

  const myLoader = ({ src }) => {
    return `http://localhost:3000${src}`
  }

  return <Image alt={props.alt} {...props} loader={myLoader} />
}