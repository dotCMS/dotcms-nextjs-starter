// Internals
import { htmlParser } from '@/utils'

export type HTMLParserProps = {
  body: string
}

export const WebPageContent = ({ body }: HTMLParserProps) => {
  return htmlParser({ content: body })
}

export default WebPageContent
