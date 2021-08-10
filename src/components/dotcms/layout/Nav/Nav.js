import React, { useState, useContext } from 'react'
import Image from 'next/image'

import LanguageSelector from '../LanguageSelector'
import MenuList from './MenuList'
import PageContext from '../../../../contexts/PageContext'
import RouterLink from '../../../RouterLink'
import SocialMediaMenu from './SocialMediaMenu'
import useNav from '../../../../hooks/useNav'
import { MainNav, NavMenu } from '../../../../styles/nav/nav.styles'
import { getCurrentLanguage } from '../../../../utilities/dotcms/locale'

export default function Nav() {
  const nav = useNav()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const {
    languageProps: { defaultLanguage },
  } = useContext(PageContext)

  const handleOpenMenu = (e) => {
    e.preventDefault()
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="container">
      <MainNav className="main-nav">
        <RouterLink
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
        </RouterLink>
        <NavMenu isOpen={isMenuOpen}>
          <button
            aria-label="button"
            className="hamburger"
            href="#"
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
