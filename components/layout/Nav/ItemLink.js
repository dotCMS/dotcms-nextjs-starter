import { NavLink } from 'react-router-dom';

const ItemLink = props => {
    return (
        <NavLink
            activeClassName="active"
            className="rd-nav-item"
            to={{
                pathname: props.pathname,
                state: props.state
            }}
        >
            <span className={props.className}>{props.children}</span>
        </NavLink>
    );
};

export default ItemLink;
