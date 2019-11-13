import React from 'react';
import PropTypes from 'prop-types';
import ItemLink from './ItemLink';

const NavOption = ({ item }) => {
    return (
        <li className="rd-nav-item" key={item.folder}>
            <ItemLink className="rd-nav-link" pathname={item.href}>
                {item.title}
            </ItemLink>
        </li>
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
