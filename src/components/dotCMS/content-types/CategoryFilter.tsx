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

  // TODO: This reduce is not returning anything, figure out why
  // const data: any[] = storeNav.children.reduce(function (acc: any, curr: any) {
  //   if (curr.children.length) {
  //     acc = [
  //       ...acc,
  //       ...curr.children.map((children: { title: string; href: string }) => ({
  //         title: children.title,
  //         href: children.href,
  //       })),
  //     ]
  //   }

  //   return acc
  // }, [])

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
