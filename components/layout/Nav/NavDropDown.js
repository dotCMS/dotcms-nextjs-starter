import { useState } from 'react';
import PropTypes from 'prop-types';
import ItemLink from './ItemLink';

const NavDropDown = ({ options }) => {
    const [focus, setFocus] = useState(false);

    const classStatus = `rd-nav-item rd-navbar--has-megamenu rd-navbar-submenu ${focus ? 'focus' : ''}`;

    return (
        <li
            className={classStatus}
            onMouseOver={() => {
                setFocus(true);
            }}
            onMouseOut={() => {
                setFocus(false);
            }}
        >
            <ItemLink pathname={options.href} className="rd-nav-link">
                {options.title}
            </ItemLink>
            <span className="rd-navbar-submenu-toggle"></span>

            <ul className="rd-menu rd-navbar-megamenu rd-navbar-open-left rd-navbar-open-right">
                {options.children.map((subItem, index) => {
                    return (
                        <li className="rd-megamenu-item" key={index}>
                            <div className="rd-megamenu-title">
                                <ItemLink pathname={subItem.href} target={subItem.target}>
                                    {subItem.title}
                                </ItemLink>
                            </div>
                            <ul className="rd-megamenu-list">
                                {subItem.children.map((extraItem, k) => {
                                    return (
                                        <li className="rd-megamenu-list-item" key={k}>
                                            <ItemLink pathname={extraItem.href} target={extraItem.target}>
                                                {extraItem.title}
                                            </ItemLink>
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
