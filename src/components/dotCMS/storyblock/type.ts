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
