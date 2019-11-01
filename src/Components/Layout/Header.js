import React from 'react';
import { Navbar, NavbarBrand, Container as BootstrapContainer } from 'reactstrap';
import { Link } from 'react-router-dom';

import Nav from '../Nav/Nav';
import './Header.css';


const Header = (props) => {
    return (
        <>
            <div className="header">
                <Navbar tag="header" className="container" expand="md" >
                    <NavbarBrand className="header__brand-logo" tag={Link} to="/">
                        dotCMS SPA
                        <div style={{fontSize:'14px',marginLeft:'7px'}}>{props.title}</div>
                    </NavbarBrand>
                    
                    <Nav />
                </Navbar>
            </div>
        </>
    );
};

export default Header;
