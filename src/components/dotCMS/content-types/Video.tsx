export type VideoProps = {
  id: string
  thumbnailLarge: string
}

// TODO: Render the thumnail using `aspect-ratio` instead of background-image
export const Video = ({ id, thumbnailLarge }: VideoProps) => (
  <a
    className="video-cover"
    href={'https://www.youtube.com/watch?v=' + id}
    rel="noopener noreferrer"
    style={{ marginBottom: '1rem', display: 'block' }}
    target="_blank"
  >
    <div
      className="video-img"
      style={{
        background: `url("${thumbnailLarge}") 0 0 no-repeat`,
        height: '360px',
      }}
    />
  </a>
)

export default Video
