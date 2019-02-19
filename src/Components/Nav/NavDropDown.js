import React, { Component } from 'react';
import PageContext from '../../PageContext';
import PropTypes from 'prop-types';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NavDropDown extends Component {
    static contextType = PageContext;
    languagePrefix = '';

    render() {
        const { options } = this.props;
        this.languagePrefix =
            this.context.language && this.context.language.code
                ? `/${this.context.language.code}`
                : '';
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="nav-option">
                    {options.title}
                </DropdownToggle>
                <DropdownMenu className="nav-dropdown" right>
                    {options.children.map((subItem, index) => {
                        return (
                            <DropdownItem
                                tag={Link}
                                to={this.languagePrefix + subItem.href}
                                active={subItem.href === window.location.pathname}
                                key={index}
                            >
                                {subItem.title}
                            </DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}

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
