import React from 'react';
import { Container as BootstrapContainer } from 'reactstrap';

import './Footer.css';

const Footer = (props) => {
    return (
        <footer>
            <BootstrapContainer>
                <p className="text-center">DotCMS SPA Starter Site 2019</p>
            </BootstrapContainer>
        </footer>
    );
};

export default Footer;
