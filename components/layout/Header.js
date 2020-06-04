import Nav from './Nav/Nav';
import LocaleDropdown from './LocaleDropdown';
import RouterLink from '../RouterLink';

const Header = () => {
    return (
        <>
            <header>
                {/* RD Navbar */}
                <div className="rd-navbar-wrap">
                    <nav
                        className="rd-navbar rd-navbar-static rd-navbar-classic"
                        data-layout="rd-navbar-fixed"
                        data-sm-layout="rd-navbar-fixed"
                        data-md-layout="rd-navbar-fixed"
                        data-md-device-layout="rd-navbar-fixed"
                        data-lg-layout="rd-navbar-static"
                        data-lg-device-layout="rd-navbar-static"
                        data-xl-layout="rd-navbar-static"
                        data-xl-device-layout="rd-navbar-static"
                        data-lg-stick-up-offset="78px"
                        data-xl-stick-up-offset="98px"
                        data-xxl-stick-up-offset="118px"
                        data-lg-stick-up="true"
                        data-xl-stick-up="true"
                        data-xxl-stick-up="true"
                    >
                        <div
                            className="rd-navbar-collapse-toggle rd-navbar-fixed-element-1"
                            data-rd-navbar-toggle=".rd-navbar-collapse"
                        >
                            <span></span>
                        </div>

                        <div className="rd-navbar-aside-outer rd-navbar-collapse bg-default">
                            <div className="rd-navbar-aside">
                                {/* CONTACT INFO */}
                                <ul className="list-inline list-inline-xxl">
                                    <li>
                                        <div className="unit unit-spacing-xs">
                                            <div className="unit-left">
                                                <span className="icon mdi mdi-map-marker"></span>
                                            </div>
                                            <div className="unit-body">
                                                <a href="#">
                                                    3059 Grand Avenue, Suite 300 Miami, FL, 33133
                                                    USA
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="unit unit-spacing-xs">
                                            <div className="unit-left">
                                                <span className="icon mdi mdi-cellphone-android"></span>
                                            </div>
                                            <div className="unit-body">
                                                <a href="tel:+1-888-404-6185">+1-888-404-6185</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="unit unit-spacing-xs">
                                            <div className="unit-left">
                                                <span className="icon mdi mdi-email-outline"></span>
                                            </div>
                                            <div className="unit-body">
                                                <a href="mailto: info@dotcms.com">
                                                    info@dotcms.com
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div>
                                    <LocaleDropdown />

                                    {/* CART */}
                                    {/* <a className="basket" href="/store/cart">
                                        <span className="icon mdi mdi-cart-outline"></span>
                                        <span className="basket-count">3</span>
                                    </a> */}
                                </div>
                            </div>
                        </div>

                        <div className="rd-navbar-main-outer">
                            <div className="rd-navbar-main">
                                <div className="rd-navbar-panel">
                                    <button
                                        className="rd-navbar-toggle"
                                        data-rd-navbar-toggle=".rd-navbar-nav-wrap"
                                        aria-label="Toggle Menu"
                                    >
                                        <span></span>
                                    </button>
                                    <div className="rd-navbar-brand">
                                        <RouterLink href="/index" className="brand">
                                            <img
                                                className="brand-logo-dark"
                                                src={`/application/themes/travel/images/logo.png`}
                                                width="195"
                                                height="40"
                                                alt="TravelLux Home"
                                            />
                                        </RouterLink>
                                    </div>
                                </div>

                                {/* NAV BAR */}
                                <Nav />
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
