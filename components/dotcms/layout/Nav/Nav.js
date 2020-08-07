import React, { useState, useContext } from 'react';
import LanguageSelector from '../LanguageSelector';
import MenuList from '../../layout/Nav/MenuList';
import PageContext from '../../../../contexts/PageContext';
import SocialMediaMenu from '../../layout/Nav/SocialMediaMenu';
import logo from '../../../../public/logo.png';
import menuIcon from '../../../../public/menu.svg';
import useNav from '../../../../hooks/useNav';
import { MainNav, NavMenu } from '../../../../styles/nav/nav.styles';
import RouterLink from '../../../RouterLink';
import { getCurrentLanguage } from '../../../../utilities/dotcms/locale';

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

    return (
        <div className="container">
            <MainNav className="main-nav">
                <RouterLink
                    href={
                        getCurrentLanguage() && !defaultLanguage ? `/${getCurrentLanguage()}` : `/`
                    }
                >
                    <img src={logo} alt="" width={135} height={41} />
                </RouterLink>
                <NavMenu isOpen={isMenuOpen}>
                    <button
                        className="hamburger"
                        href="#"
                        aria-label="button"
                        onClick={(e) => handleOpenMenu(e)}
                    >
                        <img src={menuIcon} alt="Hamburger Icon" />
                    </button>
                    <MenuList navigation={nav} />
                    <SocialMediaMenu />
                    <LanguageSelector />
                </NavMenu>
            </MainNav>
        </div>
    );
}
