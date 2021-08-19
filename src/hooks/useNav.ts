// Dependencies
import * as React from 'react'

// Internals
import { PageContext } from '@/contexts'

export type NavigationItem = {
  title: string
  href: string
  children?: NavigationItem[]
}

export function useNav() {
  let { nav } = React.useContext(PageContext)

  nav = nav.map((nav) => {
    let navObj: NavigationItem = {
      title: nav.title,
      href: nav.href,
    }

    if (nav.children.length > 0) {
      navObj = {
        ...navObj,
        children: nav.children,
      }
    }
    return navObj
  })

  return nav
}
