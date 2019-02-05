import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Nav from './Nav/Nav';
import './Header.css';

const Header = (props) => {
    return (
        <>
            <Navbar tag="header" className="header__menu container" expand="md">
                <NavbarBrand className="header__brand-logo" href="/">
                    DotCMS - SPA
                </NavbarBrand>
                <Nav />
            </Navbar>
            <section className="header__extend">
                <div className="header__overlay" />
                <div className="header__content">
                    <h2 className="header__page-title">{props.title}</h2>
                </div>
            </section>
        </>
    );
};

export default Header;
