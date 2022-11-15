// Internals
import { DotCMSImage } from '@/components'
import { Wrapper } from './style'

export type ImageProps = {
  title: string
  description: string
  fileAsset: string
  identifier: string
  name: string
  width: number
  height: number
}

export const Image = (props: ImageProps) => {
  const { description, fileAsset, title, identifier, name, width, height } =
    props
  const imageDescription =
    description.length > 120 ? description.substring(0, 120) : description;
  const imagePath = identifier && name ? `/dA/${identifier}/${name}` : fileAsset;

  return (
    <Wrapper>
        {width && height ? (
          <DotCMSImage
            alt={title}
            height={height}
            path={imagePath}
            width={width}
          />
        ) : (
          // If 'width' or 'height' is not provided, we use a normal img tag.
          // This code has been extracted from the official documentation: https://nextjs.org/docs/messages/no-img-element#possible-ways-to-fix-it
          <picture>
            <source srcSet={imagePath} type="image/webp" />
            <img alt={title} src={imagePath} />
          </picture>
        )}
      <div className="body">
        <h4>{title}</h4>
        <p>{imageDescription}</p>
      </div>
      <div className="overlay" />
    </Wrapper>
  )
}

export default Image
