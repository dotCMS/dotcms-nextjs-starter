// Dependencies
import * as React from 'react'
import { useRouter } from 'next/router'

// Internals
import { Link } from '@/components'

const getHref = (href: string) => {
  const ref = href
    .split('/')
    .filter((part) => part !== 'index')
    .join('/')

  return ref || '/'
}

export type MenuListProps = {
  // TODO: add correct types with GraphQL-Codegen
  navigation: any[]
}

export const MenuList = ({ navigation }: MenuListProps) => {
  const router = useRouter()

  const routerLinkClassName = (item: Record<string, string>) => {
    return [
      router.asPath.split('/').filter(Boolean)[0] === item.href.split('/')[1]
        ? 'active'
        : '',
      item.children ? 'hasChildren' : '',
    ]
  }

  return (
    <ul className="menu menu__list">
      {navigation.map((item, index) => (
        <li className={routerLinkClassName(item).join(' ')} key={index}>
          <Link href={getHref(item.href)} key={item.href}>
            {item.title}
          </Link>
          {item.children && (
            <ul className="submenu">
              {item.children[0].children.map(
                (child: Record<string, string>, idx: number) => {
                  return (
                    <li key={idx}>
                      <Link href={getHref(child.href)}>{child.title}</Link>
                    </li>
                  )
                }
              )}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export default MenuList
