import React from 'react';
import PropTypes from 'prop-types';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    NavItem,
    UncontrolledDropdown
} from "reactstrap";
import NavOption from "./NavOption";

const NavDropDown = ({ options }) => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                {options.title}
            </DropdownToggle>
            <DropdownMenu right>
                {options.children.map( subItem => {
                    return (
                        <DropdownItem>
                            <NavOption item={subItem}/>
                        </DropdownItem>
                    )
                })}
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

NavItem.propTypes = {
    options: PropTypes.object.isRequired
};

export default NavDropDown;
