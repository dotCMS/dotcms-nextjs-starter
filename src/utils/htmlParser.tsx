// Dependencies
import parse, { domToReact } from 'html-react-parser'
import type { Element, HTMLReactParserOptions } from 'html-react-parser'

// Internals
import { Link } from '@/components'

const EXCLUDED_CONTENT = ['form-booking', 'breadcrumbs-custom']

/**
 * A function to check if the path is an external link
 *
 * @param {string} path - The path to check
 */
const isAbsolutePath = (path: string) => {
  const regex = /^https?:\/\/|^\/\//i

  return regex.test(path)
}

/**
 * I got some TS issues, that's why I came up with `typedDomNode`.
 *
 * Related issues:
 * @see https://github.com/remarkablemark/html-react-parser/issues/221#issuecomment-771600574
 */
const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const typedDomNode = domNode as Element

    if (typedDomNode.type === 'tag') {
      if (EXCLUDED_CONTENT.includes(typedDomNode.attribs.class)) {
        return null
      }
    }

    if (
      typedDomNode.name === 'a' &&
      isAbsolutePath(typedDomNode.attribs.href)
    ) {
      return (
        <Link {...(typedDomNode.attribs as any)}>
          {typedDomNode.children && domToReact(typedDomNode.children, options)}
        </Link>
      )
    }
  },
}

type HTMLParserOptions = {
  content: string
  options?: HTMLReactParserOptions
}

/**
 * Some data from DotCMS comes as a string HTML, for example from WYSIYG fields. So we parse this
 * html, turn them into react component and replace <a> for <RouterLink> to use NextJS routing.
 */
export const htmlParser = ({ content, options }: HTMLParserOptions) => {
  return parse(content, options)
}

export default htmlParser
