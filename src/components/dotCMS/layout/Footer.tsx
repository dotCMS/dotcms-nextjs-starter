// Dependencies
import * as React from 'react'

import Image from 'next/image'

// Internals
import { LocalImage } from '@/components'
import { FooterContainer, FooterSection } from '@/styles/footer/footer.styles'

export const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterSection className="footer__section">
          <a aria-label="Footer Logo" className="main-nav__logo" href="#">
            <Image
              alt="DotCMS - NextJS example"
              height="41"
              src="/logo.png"
              width="135"
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
              <LocalImage
                alt="Faceboook"
                height="32"
                src="/fb.svg"
                width="32"
              />
            </a>
            <a href="#">
              <LocalImage
                alt="Instagram"
                height="32"
                src="/instagram.svg"
                width="32"
              />
            </a>
            <a href="#">
              <LocalImage
                alt="Linkedin"
                height="32"
                src="/linkedin.svg"
                width="32"
              />
            </a>
            <a href="#">
              <LocalImage
                alt="Twitter"
                height="32"
                src="/twitter.svg"
                width="32"
              />
            </a>
            <a href="#">
              <LocalImage
                alt="Pinterest"
                height="32"
                src="/pinterest.svg"
                width="32"
              />
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
  )
}

export default Footer
