import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { MainNav, NavMenu } from '../../../styles/nav/nav.styles';
import SocialMediaMenu from '../../layout/Nav/SocialMediaMenu';
import MenuList from '../../layout/Nav/MenuList';
import logo from '../../../public/logo.png';
import menuIcon from '../../../public/menu.svg';
import useNav from '../../../hooks/useNav';
import Link from 'next/link';
import LanguageSelector from '../LanguageSelector';

export default function Nav() {
    const nav = useNav();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleOpenMenu = (e) => {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    };

    const router = useRouter();
    
    const current =
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('dotcms_language');
    const isDefaultLanguage = current !== process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
    useEffect(() => {
        if (
            current &&
            isDefaultLanguage &&
            Object.entries(router.query).length > 0 &&
            !router.query.slug.includes(current)
        ) {
            let route =
                router.query.slug && router.query.slug.length > 0
                    ? [current, ...router.query.slug]
                    : [current];
            route = new Set(route);
            router.push('/[[...slug]]', `/${Array.from(route).join('/')}`);
        }
    }, []);

    return (
        <div className="container">
            <MainNav className="main-nav">
                <Link href={current && isDefaultLanguage ? `/${current}` : `/`}>
                    <a className="main-nav__logo" aria-label="Logo">
                        <img src={logo} alt="" width={135} height={41} />
                    </a>
                </Link>
                <NavMenu className="main-nav__menu" isOpen={isMenuOpen}>
                    <a
                        className="hamburger"
                        href="#"
                        aria-label="button"
                        onClick={(e) => handleOpenMenu(e)}
                    >
                        <img src={menuIcon} alt="Hamburger Icon" />
                    </a>
                    <MenuList navigation={nav} />
                    <SocialMediaMenu />
                    <LanguageSelector />
                </NavMenu>
            </MainNav>
        </div>
    );
}
