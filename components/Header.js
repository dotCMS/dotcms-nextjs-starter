import React from 'react';
import logo from '../public/logo.png';
import styled from 'styled-components';
import RouterLink from './RouterLink';
import PageContext  from '../contexts/PageContext'
import { useRouter } from 'next/router';

const MainNav = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--primary-spacing) 0;

    .main-nav {
        &__logo {
            img {
                vertical-align: middle;
            }
        }
    }
`;

const NavMenu = styled.div`
    display: flex;
    .menu {
        &__list {
        }
        &__list:not(:only-child) {
            margin-right: 4rem;
        }

        &__icons {
        }
    }
`;

function Header() {

    let {nav} = React.useContext(PageContext);
    nav = nav.map((nav => ({title: nav.title, href: nav.href})));
    const router = useRouter();

    console.log()

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
                                className={`${router.asPath === item.href ? 'active' : ''}`}
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
