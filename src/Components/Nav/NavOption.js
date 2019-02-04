import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavOption.css';

const NavOption = ({ item }) => {
    return (
        <NavItem key={item.folder}>
            <NavLink className="nav-option" tag={Link} active={item.href === window.location.pathname} to={item.href}>
                {item.title}
            </NavLink>
        </NavItem>
    );
};

NavOption.propTypes = {
    item: PropTypes.shape({
        folder: PropTypes.string,
        href: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};

export default NavOption;
