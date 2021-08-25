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

  const data: any[] = storeNav.children.reduce(function (acc, curr) {
    if (curr.children.length > 0) {
      acc = [
        ...acc,
        ...curr.children.map((children) => ({
          title: children.title,
          href: children.href,
        })),
      ]
    }
    return acc
  }, [])

  return (
    <SidebarContainer>
      <h4 className="sidebar-title">{props.title}</h4>
      <ul>
        {data.map((item) => (
          <li key={item.href}>
            <Link href={item.href} prefetch>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </SidebarContainer>
  )
}

export default CategoryFilter
