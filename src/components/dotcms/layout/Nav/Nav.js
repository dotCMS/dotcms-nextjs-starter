import React, { useState, useContext } from 'react';
import Image from 'next/image'

import LanguageSelector from '../LanguageSelector';
import MenuList from '../../layout/Nav/MenuList';
import PageContext from '../../../../contexts/PageContext';
import RouterLink from '../../../RouterLink';
import SocialMediaMenu from '../../layout/Nav/SocialMediaMenu';
import useNav from '../../../../hooks/useNav';
import { MainNav, NavMenu } from '../../../../styles/nav/nav.styles';
import { getCurrentLanguage } from '../../../../utilities/dotcms/locale';
import { LocalImage } from '../../../LocalImage';

export default function Nav() {
  const nav = useNav();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    languageProps: { defaultLanguage }
  } = useContext(PageContext);

  const handleOpenMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const myLoader = ({ src }) => {
    return `http://localhost:3000${src}`
  }

  return (
    <div className="container">
      <MainNav className="main-nav">
        <RouterLink
          href={
            getCurrentLanguage() && !defaultLanguage ? `/${getCurrentLanguage()}` : `/`
          }
        >
          <LocalImage alt="DotCMS - NextJS example" height="41" loader={myLoader} src="/logo.png" width="135" />
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
  );
}
