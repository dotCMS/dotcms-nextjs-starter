// Dependencies
import * as React from 'react'

export const PageContext = React.createContext({
  isEditMode: false,
  nav: [],
  language: {},
})

export default PageContext
