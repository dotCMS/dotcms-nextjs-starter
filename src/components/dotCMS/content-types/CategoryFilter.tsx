// Dependencies
import * as React from 'react'

// Internals
import { Link } from '@/components'
import { PageContext } from '@/contexts'
import { SidebarContainer } from '@/styles/category-filter/category.styles'

export type CategoryFilterProps = {
  title: string
}

export const CategoryFilter = (props: CategoryFilterProps) => {
  const { nav } = React.useContext(PageContext)
  const [storeNav] = nav.filter(
    (nav) => nav.href === '/Store' || nav.href === '/store'
  )

  return (
    <SidebarContainer>
      <h4 className="sidebar-title">{props.title}</h4>
      <ul>
        {storeNav.children.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </SidebarContainer>
  )
}

export default CategoryFilter
