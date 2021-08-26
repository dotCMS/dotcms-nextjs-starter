// Internals
import { htmlParser } from '@/utils'

export type HTMLParserProps = {
  body: string
}

export const WebPageContent = ({ body }: HTMLParserProps): JSX.Element => {
  return htmlParser({ content: body }) as JSX.Element
}

export default WebPageContent
