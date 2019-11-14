import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const getLink = (props, p) => (
    <a href={p.href} className={props.className}>
        {props.children}
    </a>
);

const getList = (props, p) => {
    const [focus, setFocus] = useState(false);

    const dropDownClasses = `${
        p.className
    } rd-navbar--has-megamenu rd-navbar-submenu ${focus ? 'focus' : ''}`;

    return (
        <li
            className={
                props.topMenu && props.dropDown ? dropDownClasses : p.className
            }
            onMouseOver={() => {
                setFocus(true);
            }}
            onMouseOut={() => {
                setFocus(false);
            }}
        >
            {!Array.isArray(props.children) ? (
                getLink(props, p)
            ) : (
                <>{props.children}</>
            )}
        </li>
    );
};

const ItemLink = props => {
    return (
        <NavLink
            component={p => {
                return props.topMenu ? getList(props, p) : getLink(props, p);
            }}
            activeClassName="active"
            className="rd-nav-item"
            to={{
                pathname: props.pathname,
                state: props.state
            }}
        />
    );
};

export default ItemLink;
