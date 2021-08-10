// Dependencies
import * as React from 'react'

const PageContext = React.createContext({
  isEditMode: false,
  nav: [],
  language: {},
})

export default PageContext
