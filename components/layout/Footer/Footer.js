import { Container as BootstrapContainer, Row as BootstrapRow, Col as BootstrapCol } from 'reactstrap';

import BlogListing from './BlogListing';

const Footer = props => {
    return (
        <footer
            className="footer-classic bg-footer bg-overlay-80 context-dark"
            style={{
                backgroundImage: "url('/dA/a9f30020-54ef-494e-92ed-645e757171c2/image/WebP/1200w/footer-image.jpg')"
            }}
        >
            <div className="section-xxl">
                <BootstrapContainer>
                    <BootstrapRow className="row-50 justify-content-center">
                        <BootstrapCol lg={4}>
                            <h2>About us</h2>
                            <p className="max-width-xl-90 text-gray-400">
                                We are TravelLux, a community of dedicated travel experts, journalists, and bloggers.
                                Our aim is to offer you the best insight on where to go for your travel as well as to
                                give you amazing opportunities with free benefits and bonuses for registered clients.
                            </p>
                            <a className="footer-brand" href="./">
                                <img
                                    src="/application/themes/travel/images/logo-inverse.png"
                                    alt="TravelLux Home"
                                    height="40"
                                />
                            </a>
                        </BootstrapCol>

                        <BootstrapCol sm={8} md={6} lg={4}>
                            <h2>Latest blog posts</h2>
                            <BlogListing />
                        </BootstrapCol>
                        <BootstrapCol sm={8} md={6} lg={4}>
                            <h2>Get in touch</h2>
                            <form
                                className="rd-form form-sm rd-mailform"
                                data-form-output="form-output-global"
                                data-form-type="contact"
                                method="post"
                                action=""
                            >
                                <div className="form-wrap">
                                    <input
                                        className="form-input"
                                        id="footer-form-name"
                                        type="text"
                                        name="name"
                                        data-constraints="@Required"
                                    />
                                    <label className="form-label" htmlFor="footer-form-name">
                                        Name
                                    </label>
                                </div>
                                <div className="form-wrap">
                                    <input
                                        className="form-input"
                                        id="footer-form-email"
                                        type="email"
                                        name="email"
                                        data-constraints="@Email @Required"
                                    />
                                    <label className="form-label" htmlFor="footer-form-email">
                                        E-mail
                                    </label>
                                </div>
                                <div className="form-wrap">
                                    <label className="form-label" htmlFor="footer-form-message">
                                        Message
                                    </label>
                                    <textarea
                                        className="form-input"
                                        id="footer-form-message"
                                        name="message"
                                        data-constraints="@Required"
                                    ></textarea>
                                </div>
                                <div className="form-wrap">
                                    <button className="button button-md button-primary" type="submit">
                                        Send
                                    </button>
                                </div>
                            </form>
                        </BootstrapCol>
                    </BootstrapRow>
                </BootstrapContainer>
            </div>
            <BootstrapContainer>
                <p className="rights mb-0">
                    <span>©2012 - 2019 All Rights Reserved</span>
                    <a href="https://dotcms.com/company/policies/privacy-policy">Terms of Use</a> <span>and</span>
                    <a href="https://dotcms.com/company/policies/privacy-policy">Privacy Policy</a>
                </p>
            </BootstrapContainer>
        </footer>
    );
};

export default Footer;
