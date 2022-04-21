export interface BlogListingProps {
  posts: Post[]
}

export interface Post {
  identifier: string
  inode: string
  title: string
  urlTitle: string
  image: Image
  teaser: string
  postingDate: string
  tags: string[]
}

interface Image {
  rawUri: string
  resizeUri: string
  file: string
  shortyUrl: string
  shortyUrlInode: string
  shorty: string
  thumbnailUri: string
  name: string
  size: string
  width: number
  height: number
}
