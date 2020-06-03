import React from 'react';
import logo from '../public/logo.png';
import styled from 'styled-components';
import RouterLink from '../components/Shared/RouterLink';

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
    return (
        <div className="container">
            <MainNav className="main-nav">
                <RouterLink href="/store" className="main-nav__logo">
                    <img src={logo} alt="" width={135} height={41} />
                </RouterLink>
                <NavMenu className="main-nav__menu">
                    <nav className="menu__list">
                        <a className="active" href="#">
                            Home
                        </a>
                        <a href="#">Shop</a>
                        <a href="#">About</a>
                        <a href="#">Team</a>
                        <a href="#">Contact</a>
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
