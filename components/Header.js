import React from 'react';
import logo from '../public/logo.png';
import RouterLink from './RouterLink';
import PageContext from '../contexts/PageContext';
import { useRouter } from 'next/router';
import { MainNav, NavMenu } from '../styles/nav/nav.styles'

function Header() {
    let { nav } = React.useContext(PageContext);
    nav = nav.map((nav) => ({ title: nav.title, href: nav.href }));
    const router = useRouter();

    return (
        <div className="container">
            <MainNav className="main-nav">
                <RouterLink href="/store" className="main-nav__logo">
                    <img src={logo} alt="" width={135} height={41} />
                </RouterLink>
                <NavMenu className="main-nav__menu">
                    <nav className="menu__list">
                        {nav.map((item) => (
                            <RouterLink
                                key={item.href}
                                className={`${
                                    router.asPath.split('/').filter(Boolean)[0] === item.href.split("/")[1]
                                        ? 'active'
                                        : ''
                                }`}
                                href={item.href}
                            >
                                {item.title}
                            </RouterLink>
                        ))}
                    </nav>
                    <nav className="menu__icons">
                        <a href="#">Search</a>
                        <a href="#">Cart</a>
                    </nav>
                </NavMenu>
            </MainNav>
        </div>
    );
}

export default Header;
