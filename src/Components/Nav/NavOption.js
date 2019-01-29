import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from "react-router-dom";

const NavOption = ({ item }) => {
    return (
        <NavItem key={item.folder}>
            <NavLink tag={Link} active={item.href === window.location.pathname} to={item.href}>
                {item.title}
            </NavLink>
        </NavItem>
    );
};

NavItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default NavOption;
