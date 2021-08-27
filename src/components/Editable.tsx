// Dependencies
import * as React from 'react'

export type EditableProps = {
  element: React.ReactElement
  className?: string
  mode: string
  field: string
  lang: string
  inode: string
  onClick?: () => void
  href?: string
  textColor?: string
}

export const Editable = ({ element, ...rest }: EditableProps) => {
  const { mode, field, lang, inode, onClick } = rest
  const {
    props: { children },
  } = element
  return React.cloneElement(
    element,
    {
      ...rest,
      onClick:
        onClick &&
        ((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          e.preventDefault()
          e.stopPropagation()
          onClick()
        }),
      'data-mode': mode || 'minimal',
      'data-field-name': field,
      'data-language': lang,
      'data-inode': inode,
    },
    children
  )
}

export default Editable
