import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Nav from './Nav/Nav';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <>
            <Navbar tag="header" className="header__menu" color="light" light expand="md">
                <NavbarBrand href="/">DotCMS - SPA</NavbarBrand>
                <Nav />
            </Navbar>
            <section className="header__extend">
                <div className="header__overlay" />
                <div className="header__content">
                    <h2 className="header__page-title">Page Title</h2>
                    <p className="header__breadcrumbs">
                        <Link
                            to={{
                                pathname: '/'
                            }}
                        >
                            <span className="header__home-link">Home</span>
                        </Link>
                        Page-Title
                    </p>
                </div>
            </section>
        </>
    );
};

export default Header;
