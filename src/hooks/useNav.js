import { useContext, useMemo } from 'react'
import PageContext from '../contexts/PageContext'

export default function useNav() {
  let { nav } = useContext(PageContext)
  nav = nav.map((nav) => {
    let navObj = {
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
