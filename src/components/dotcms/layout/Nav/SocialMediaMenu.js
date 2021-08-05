import React from 'react';
import Image from 'next/image';

function SocialMediaMenu() {
    return (
        <nav className="menu menu__icons">
            <a href="#" aria-label="button">
                <Image src="/search.svg" alt="Search" width="24" height="24" />
            </a>
            <a href="#" aria-label="button">
                <Image src="/shopping-cart.svg" alt="Shopping Cart" width="24" height="24" />
            </a>
        </nav>
    );
}

export default SocialMediaMenu;
