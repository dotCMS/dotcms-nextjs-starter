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
                    <Image src="/logo.png" alt="DotCMS - NextJS example" width="135" height="41" />
                </RouterLink>
                <NavMenu isOpen={isMenuOpen}>
                    <button
                        className="hamburger"
                        href="#"
                        aria-label="button"
                        onClick={(e) => handleOpenMenu(e)}
                    >

                        <Image src="/menu.svg" alt="Open Menu" width="24" height="24" />
                    </button>
                    <MenuList navigation={nav} />
                    <SocialMediaMenu />
                    <LanguageSelector />
                </NavMenu>
            </MainNav>
        </div>
    );
}
