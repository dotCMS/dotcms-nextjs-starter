import React from 'react';
import { FooterContainer, FooterSection } from '../../../styles/footer/footer.styles';

import Image from 'next/image';

function Footer() {
    return (
        <FooterContainer>
            <div className="container">
                <FooterSection className="footer__section">
                    <a className="main-nav__logo" href="#" aria-label="Footer Logo">
                        <Image
                            src="/logo.png"
                            alt="DotCMS - NextJS example"
                            width="135"
                            height="41"
                        />
                    </a>
                    <nav className="menu__list">
                        <a className="active" href="#">
                            Home
                        </a>
                        <a href="#">Shop</a>
                        <a href="#">About</a>
                        <a href="#">Team</a>
                        <a href="#">Contact</a>
                    </nav>
                    <span>English version</span>
                </FooterSection>
                <FooterSection className="icons">
                    <nav className="menu__list">
                        <a href="#">
                            <Image src="/fb.svg" alt="Faceboook" width="32" height="32" />
                        </a>
                        <a href="#">
                            <Image src="/instagram.svg" alt="Instagram" width="32" height="32" />
                        </a>
                        <a href="#">
                            <Image src="/linkedin.svg" alt="Linkedin" width="32" height="32" />
                        </a>
                        <a href="#">
                            <Image src="/twitter.svg" alt="Twitter" width="32" height="32" />
                        </a>
                        <a href="#">
                            <Image src="/pinterest.svg" alt="Pinterest" width="32" height="32" />
                        </a>
                    </nav>
                </FooterSection>
                <FooterSection>
                    <nav className="menu__list">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Legal</a>
                        <a href="#">Sitemap</a>
                    </nav>
                    <p>&copy; 2020 dotCMS. MIT.</p>
                </FooterSection>
            </div>
        </FooterContainer>
    );
}

export default Footer;
