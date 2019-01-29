import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import NavOption from './NavOption';

const NavDropDown = ({ options }) => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                {options.title}
            </DropdownToggle>
            <DropdownMenu right>
                {options.children.map((subItem, index) => {
                    return (
                        <DropdownItem key={index}>
                            <NavOption item={subItem} />
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </UncontrolledDropdown>
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
