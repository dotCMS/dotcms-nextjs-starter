// Dependencies
import ReactHtmlParser, { domToReact } from 'html-react-parser'
import type { Element, HTMLReactParserOptions } from 'html-react-parser'

// Internals
import { Link } from '@/components'

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const typedDomNode = domNode as Element

    if (typedDomNode.type === 'tag' && typedDomNode.name === 'a') {
      return (
        <Link {...(typedDomNode.attribs as any)}>
          {domToReact(typedDomNode.children, options)}
        </Link>
      )
    }
  },
}

export const withRawContent = ({ content }) => {
  return ReactHtmlParser(content, options)
}

export default withRawContent
