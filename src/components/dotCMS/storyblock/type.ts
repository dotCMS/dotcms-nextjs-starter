export interface StoryblockType {
  type: string
  content: StoryNode[]
}

export interface StoryNode<T = Record<string, string>> {
  type: string
  content?: StoryNode[]
  attrs?: T
  marks?: Mark[]
  text?: string
}

interface Mark {
  type: string
  attrs: Record<string, string>
}

export interface DotContentProps {
  title: string
  baseType: string
  inode: string
  archived: boolean
  working: boolean
  locked: boolean
  contentType: string
  live: boolean
  identifier: string
  image: string
  imageContentAsset: string
  urlTitle: string
  url: string
  titleImage: string
  urlMap: string
  hasLiveVersion: boolean
  hasTitleImage: boolean
  sortOrder: number
  modUser: string
  __icon__: string
  contentTypeIcon: string
  language: string
}
