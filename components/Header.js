import React, { useContext, useState } from 'react';
import logo from '../public/logo.png';
import searchIcon from '../public/search.svg';
import shoppingCart from '../public/shopping-cart.svg';
import menuIcon from '../public/menu.svg';
import RouterLink from './RouterLink';
import PageContext from '../contexts/PageContext';
import { useRouter } from 'next/router';
import { MainNav, NavMenu } from '../styles/nav/nav.styles';

function Header() {
    let { nav } = useContext(PageContext);
    nav = nav.map((nav) => ({ title: nav.title, href: nav.href }));
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleOpenMenu = (e) => {
        e.preventDefault()
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <div className="container">
            <MainNav className="main-nav">
                <RouterLink href="/store" className="main-nav__logo" ariaLabel="Logo">
                    <img src={logo} alt="" width={135} height={41} />
                </RouterLink>
                <NavMenu className="main-nav__menu" isOpen={isMenuOpen}>
                    <a className="hamburger" href="#" aria-label="button" onClick={(e) => handleOpenMenu(e)}>
                        <img src={menuIcon} alt="Hamburger Icon" />
                    </a>
                    <nav className="menu menu__list">
                        {nav.map((item) => (
                            <RouterLink
                                key={item.href}
                                className={`${
                                    router.asPath.split('/').filter(Boolean)[0] ===
                                    item.href.split('/')[1]
                                        ? 'active'
                                        : ''
                                }`}
                                href={item.href}
                            >
                                {item.title}
                            </RouterLink>
                        ))}
                    </nav>
                    <nav className="menu menu__icons">
                        <a href="#">
                            <img src={searchIcon} alt="Search Icon" />
                        </a>
                        <a href="#">
                            <img src={shoppingCart} alt="Shopping Cart Icon" />
                        </a>
                    </nav>
                </NavMenu>
            </MainNav>
        </div>
    );
}

export default Header;
