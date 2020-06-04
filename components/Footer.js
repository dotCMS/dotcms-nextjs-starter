import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/shared.styles';
import logo from '../public/logo.png';
import fb from '../public/fb.svg';
import instagram from '../public/instagram.svg';
import linkedin from '../public/linkedin.svg';
import twitter from '../public/twitter.svg';
import pinterest from '../public/pinterest.svg';

const FooterContainer = styled.div`
    margin-top: var(--primary-spacing);
    background: white;
    width: 100%;
    padding: var(--primary-spacing);

    & > div > * + * {
        padding: 1rem 0;
        margin-top: 5rem;
        p {
            margin: 0;
        }
    }
`;

const FooterSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    &:first-child {
        justify-content: space-between;
        nav {
            margin-right: 1.69rem;
        }
        span {
            font-size: 0.8rem;
            color: grey;
        }
    }
    &:last-child {
        flex-direction: column;
        text-align: center;
        nav {
            padding-bottom: 1rem;
            a {
                font-weight: normal;
                font-size: 0.8rem;
            }
        }
        p {
            font-size: 0.8rem;
            color: grey;
        }
    }
    &:not(:first-child) {
        justify-content: center;
    }
    nav > a:hover > img {
        filter: contrast(50%);
    }
`;

function Footer() {
    return (
        <FooterContainer>
            <div className="container">
                <FooterSection className="footer__section">
                    <a className="main-nav__logo" href="#">
                        <img src={logo} alt="" width={135} height={41} />
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
                            <img src={fb} alt="fb" />
                        </a>
                        <a href="#">
                            <img src={instagram} alt="instagram" />
                        </a>
                        <a href="#">
                            <img src={linkedin} alt="linkedin" />
                        </a>
                        <a href="#">
                            <img src={twitter} alt="twitter" />
                        </a>
                        <a href="#">
                            <img src={pinterest} alt="pinterest" />
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
