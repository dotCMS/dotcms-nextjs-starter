import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from '../../Shared/RouterLink';

const NavOption = ({ item }) => {
    return (
        <RouterLink key={item.folder} className="rd-nav-link" pathname={item.href}>
            {item.title}
        </RouterLink>
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
