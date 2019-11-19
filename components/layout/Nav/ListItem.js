import { useState } from 'react';
import AnchorLink from './AnchorLink';

const ListItem = ({
    href,
    navLinkClassName,
    children,
    topMenu,
    dropDown,
    className
} = props) => {
    const [focus, setFocus] = useState(false);

    const dropDownClasses = `${className} rd-navbar--has-megamenu rd-navbar-submenu ${
        focus ? 'focus' : ''
    }`;
    return (
        <li
            className={topMenu && dropDown ? dropDownClasses : className}
            onMouseOver={() => {
                setFocus(true);
            }}
            onMouseOut={() => {
                setFocus(false);
            }}
        >
            {!Array.isArray(children) ? (
                <AnchorLink
                    href={href}
                    navLinkClassName={navLinkClassName}
                    children={children}
                />
            ) : (
                children
            )}
        </li>
    );
};

export default ListItem;
