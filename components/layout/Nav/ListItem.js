import { useState } from 'react';
import AnchorLink from './AnchorLink';

const ListItem = ({ parentProps, props } = props) => {
    const [focus, setFocus] = useState(false);

    const dropDownClasses = `${
        props.className
    } rd-navbar--has-megamenu rd-navbar-submenu ${focus ? 'focus' : ''}`;

    return (
        <li
            className={
                parentProps.topMenu && parentProps.dropDown
                    ? dropDownClasses
                    : props.className
            }
            onMouseOver={() => {
                setFocus(true);
            }}
            onMouseOut={() => {
                setFocus(false);
            }}
        >
            {!Array.isArray(parentProps.children) ? (
                <AnchorLink parentProps={parentProps} props={props} />
            ) : (
                parentProps.children
            )}
        </li>
    );
};

export default ListItem;
