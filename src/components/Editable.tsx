// Dependencies
import * as React from 'react'

export type EditableProps = {
  element: React.ReactElement
  className?: string
  mode?: string
  field: string
  lang: string
  inode: string
  onClick?: (event?: any) => void
  href?: string
  textColor?: string,
  contentType?: any,
  editorContent?: any
}

export const Editable = ({ element, ...rest }: EditableProps) => {
  const { mode, field, lang, inode, onClick, contentType, editorContent } = rest;
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
          onClick(e)
        }),
      'data-mode': mode || 'minimal',
      'data-field-name': field,
      'data-language': lang,
      'data-inode': inode,
      ...(contentType && { 'data-content-type': contentType}),
      ...(editorContent && { 'data-block-editor-content': editorContent }),
    },
    children
  )
}

export default Editable
