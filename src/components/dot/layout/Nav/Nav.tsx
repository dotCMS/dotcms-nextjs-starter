// Dependencies
import * as React from 'react'
import Image from 'next/image'

// Internals
import { Link } from '@/components'
import { PageContext } from '@/contexts'
import { useNav } from '@/hooks'
import { getCurrentLanguage } from '@/lib/dotCMS'
import { MainNav, NavMenu } from '@/styles/nav/nav.styles'
import { LanguageSelector } from '../LanguageSelector'
import MenuList from './MenuList'
import SocialMediaMenu from './SocialMediaMenu'

export const Nav = () => {
  const nav = useNav()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const {
    // @ts-ignore TODO: add the correct types
    languageProps: { defaultLanguage },
  } = React.useContext(PageContext)

  const handleOpenMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="container">
      <MainNav className="main-nav">
        <Link
          href={
            getCurrentLanguage() && !defaultLanguage
              ? `/${getCurrentLanguage()}`
              : `/`
          }
        >
          <Image
            alt="DotCMS - NextJS example"
            height="41"
            src="/logo.png"
            width="135"
          />
        </Link>
        <NavMenu isOpen={isMenuOpen}>
          <button
            aria-label="button"
            className="hamburger"
            onClick={(e) => handleOpenMenu(e)}
          >
            <Image alt="Open Menu" height="24" src="/menu.svg" width="24" />
          </button>
          <MenuList navigation={nav} />
          <SocialMediaMenu />
          <LanguageSelector />
        </NavMenu>
      </MainNav>
    </div>
  )
}

export default Nav
