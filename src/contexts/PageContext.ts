// Dependencies
import * as React from 'react'

export type PageContextType = {
  isEditMode: boolean
  nav: any[]
  language: Record<string, any>
}

export const PageContext = React.createContext<PageContextType>({
  isEditMode: false,
  nav: [],
  language: {},
})

export default PageContext
