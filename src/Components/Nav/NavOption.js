import React, { Component } from 'react';
import PageContext from '../../PageContext';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NavOption extends Component {
    static contextType = PageContext;
    languagePrefix = '';

    render() {
        const { item } = this.props;
        this.languagePrefix =
            this.context.language && this.context.language.code
                ? `/${this.context.language.code}`
                : '';
        return (
            <NavItem key={item.folder}>
                <NavLink
                    className="nav-option"
                    tag={Link}
                    active={item.href === window.location.pathname}
                    to={this.languagePrefix + item.href}
                >
                    {item.title}
                </NavLink>
            </NavItem>
        );
    }
}

NavOption.propTypes = {
    item: PropTypes.shape({
        folder: PropTypes.string,
        href: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};
