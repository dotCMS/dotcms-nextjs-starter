import React from 'react';
import { Container as BootstrapContainer } from 'reactstrap';

import './Footer.css';

const Footer = (props) => {
    return (
        <footer>
            <BootstrapContainer>
                <p className="text-center">DotCMS SPA Starter Site &copy;2019 &nbsp; | &nbsp; <a href="/login/profile">My Profile</a></p>
            </BootstrapContainer>
        </footer>
    );
};

export default Footer;
