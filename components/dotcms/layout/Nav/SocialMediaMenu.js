import React from 'react';
import searchIcon from '../../../../public/search.svg';
import shoppingCart from '../../../../public/shopping-cart.svg';

function SocialMediaMenu() {
    return (
        <nav className="menu menu__icons">
            <a href="#" aria-label="button">
                <img src={searchIcon} alt="Search Icon" />
            </a>
            <a href="#" aria-label="button">
                <img src={shoppingCart} alt="Shopping Cart Icon" />
            </a>
        </nav>
    );
}

export default SocialMediaMenu;
