// Internals
import { DotCMSImage } from '@/components'
import { Wrapper } from './style'

export type ImageProps = {
  title: string
  description: string
  fileAsset: string
}

export const Image = (props: ImageProps) => {
  const description =
    props.description.length > 120
      ? props.description.substring(0, 120)
      : props.description

  return (
    <Wrapper>
      <DotCMSImage alt={props.title} path={props.fileAsset} width={800} />
      <div className="body">
        <h4>{props.title}</h4>
        <p>{description}</p>
      </div>
      <div className="overlay" />
    </Wrapper>
  )
}

export default Image
