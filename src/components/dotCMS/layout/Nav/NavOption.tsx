// Dependencies
import * as React from 'react'

// Internals
import { Link } from '@/components'

export type NavOptionProps = {
  item: {
    folder: string
    href: string
    title: string
  }
}

export const NavOption = ({ item }: NavOptionProps) => {
  return (
    <Link className="rd-nav-link" href={item.href} key={item.folder}>
      {item.title}
    </Link>
  )
}

export default NavOption
