// Dependencies
import * as React from 'react'

// Internals
import { Link } from '@/components'

export type DropdownItem = {
  folder: string
  href: string
  title: string
  children?: DropdownItem[]
}

export type NavDropDownProps = {
  options: DropdownItem
}

export const NavDropDown = ({ options }: NavDropDownProps) => {
  const [focus, setFocus] = React.useState(false)

  return (
    <li
      className={`rd-nav-item rd-navbar--has-megamenu rd-navbar-submenu ${
        focus ? 'focus' : ''
      }`}
      onMouseOut={() => {
        setFocus(false)
      }}
      onMouseOver={() => {
        setFocus(true)
      }}
    >
      <Link className="rd-nav-link" href={options.href}>
        {options.title}
      </Link>
      <span className="rd-navbar-submenu-toggle" />
      <ul className="rd-menu rd-navbar-megamenu rd-navbar-open-left rd-navbar-open-right">
        {options.children?.map((subItem, index) => {
          return (
            <li className="rd-megamenu-item" key={index}>
              <div className="rd-megamenu-title">
                <Link href={subItem.href}>{subItem.title}</Link>
              </div>
              <ul className="rd-megamenu-list">
                {subItem.children?.map((extraItem, k) => {
                  return (
                    <li className="rd-megamenu-list-item" key={k}>
                      <Link className="rd-dropdown-link" href={extraItem.href}>
                        {extraItem.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </li>
  )
}

export default NavDropDown
