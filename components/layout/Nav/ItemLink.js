import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const getLink = (parentProps, props) => (
    <a href={props.href} className={parentProps.className}>
        {parentProps.children}
    </a>
);

const getListItem = (parentProps, props) => {
    const [focus, setFocus] = useState(false);

    const dropDownClasses = `${
        props.className
    } rd-navbar--has-megamenu rd-navbar-submenu ${focus ? 'focus' : ''}`;

    return (
        <li
            className={
                parentProps.topMenu && parentProps.dropDown ? dropDownClasses : props.className
            }
            onMouseOver={() => {
                setFocus(true);
            }}
            onMouseOut={() => {
                setFocus(false);
            }}
        >
            {!Array.isArray(parentProps.children) ? (
                getLink(parentProps, props)
            ) : (
                <>{parentProps.children}</>
            )}
        </li>
    );
};

const ItemLink = parentProps => {
    return (
        <NavLink
            component={props => {
                return parentProps.topMenu ? getListItem(parentProps, props) : getLink(parentProps, props);
            }}
            activeClassName="active"
            className="rd-nav-item"
            to={{
                pathname: parentProps.pathname,
                state: parentProps.state
            }}
        />
    );
};

export default ItemLink;
