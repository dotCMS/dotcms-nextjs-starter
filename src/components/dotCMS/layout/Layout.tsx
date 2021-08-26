// Dependencies
import * as React from 'react'

// Internals
import { PageContext } from '@/contexts'
import { Nav } from './Nav'
import Footer from './Footer'

export const Layout: React.FC = ({ children }) => {
  const {
    // @ts-ignore TODO: add the correct types
    pageRender: {
      layout: { header, footer },
    },
  } = React.useContext(PageContext)

  return (
    <>
      {header ? <Nav /> : null}
      {children}
      {footer ? <Footer /> : null}
    </>
  )
}

export default Layout
