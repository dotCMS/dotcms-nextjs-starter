import { useState } from 'react';

import PropTypes from 'prop-types';
import RouterLink from '../../RouterLink';

const NavDropDown = ({ options }) => {
    const [focus, setFocus] = useState(false);

    return (
        <li
            className={`rd-nav-item rd-navbar--has-megamenu rd-navbar-submenu ${
                focus ? 'focus' : ''
            }`}
            onMouseOver={() => {
                setFocus(true);
            }}
            onMouseOut={() => {
                setFocus(false);
            }}
        >
            <RouterLink href={options.href} className="rd-nav-link">
                {options.title}
            </RouterLink>
            <span className="rd-navbar-submenu-toggle" />
            <ul className="rd-menu rd-navbar-megamenu rd-navbar-open-left rd-navbar-open-right">
                {options.children.map((subItem, index) => {
                    return (
                        <li className="rd-megamenu-item" key={index}>
                            <div className="rd-megamenu-title">
                                <RouterLink href={subItem.href}>{subItem.title}</RouterLink>
                            </div>
                            <ul className="rd-megamenu-list">
                                {subItem.children.map((extraItem, k) => {
                                    return (
                                        <li className="rd-megamenu-list-item" key={k}>
                                            <RouterLink
                                                className="rd-dropdown-link"
                                                href={extraItem.href}
                                            >
                                                {extraItem.title}
                                            </RouterLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
};

NavDropDown.propTypes = {
    options: PropTypes.shape({
        title: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(
            PropTypes.shape({
                folder: PropTypes.string,
                href: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired
            })
        )
    }).isRequired
};

export default NavDropDown;
