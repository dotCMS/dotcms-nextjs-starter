import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { MainNav, NavMenu } from '../../../styles/nav/nav.styles';
import logo from '../../../public/logo.png';
import searchIcon from '../../../public/search.svg';
import shoppingCart from '../../../public/shopping-cart.svg';
import menuIcon from '../../../public/menu.svg';
import RouterLink from '../../RouterLink';
import useNav from '../../../hooks/useNav'

export default function Nav() {
    const nav = useNav();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleOpenMenu = (e) => {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    };

    const routerLinkClassName = (item) => {
        return [
            router.asPath.split('/').filter(Boolean)[0] === item.href.split('/')[1] ? 'active' : '',
            item.children ? 'hasChildren' : ''
        ];
    };

    return (
        <div className="container">
            <MainNav className="main-nav">
                <RouterLink href="/store" className="main-nav__logo" ariaLabel="Logo">
                    <img src={logo} alt="" width={135} height={41} />
                </RouterLink>
                <NavMenu className="main-nav__menu" isOpen={isMenuOpen}>
                    <a
                        className="hamburger"
                        href="#"
                        aria-label="button"
                        onClick={(e) => handleOpenMenu(e)}
                    >
                        <img src={menuIcon} alt="Hamburger Icon" />
                    </a>
                    <nav className="menu menu__list">
                        {nav.map((item) => (
                            <RouterLink
                                key={item.href}
                                className={routerLinkClassName(item).join(' ')}
                                href={item.href}
                            >
                                {item.title}
                                {item.children && (
                                    <ul className="submenu">
                                        {item.children[0].children.map((child, idx) => {
                                            return (
                                                <li key={idx}>
                                                    <RouterLink href={child.href}>
                                                        {child.title}
                                                    </RouterLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </RouterLink>
                        ))}
                    </nav>
                    <nav className="menu menu__icons">
                        <a href="#" aria-label="button">
                            <img src={searchIcon} alt="Search Icon" />
                        </a>
                        <a href="#" aria-label="button">
                            <img src={shoppingCart} alt="Shopping Cart Icon" />
                        </a>
                    </nav>
                </NavMenu>
            </MainNav>
        </div>
    );
}
