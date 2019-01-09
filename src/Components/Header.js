import React from 'react';

import { Navbar, NavbarBrand } from 'reactstrap';

import Nav from './Nav';

const Header = () => {
    return (
        <Navbar tag="header" color="light" light expand="md">
            <NavbarBrand href="/">DotCMS - SPA</NavbarBrand>
            <Nav />
        </Navbar>
    );
};

export default Header;
