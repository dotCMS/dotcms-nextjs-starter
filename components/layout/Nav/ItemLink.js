import { NavLink } from 'react-router-dom';
import ListItem from './ListItem';
import AnchorLink from './AnchorLink';

const ItemLink = parentProps => {
    return (
        <NavLink
            component={props => {
                const allProps = {
                    ...parentProps,
                    ...props,
                    navLinkClassName: parentProps.className
                };
                return parentProps.topMenu ? (
                    <ListItem {...allProps} />
                ) : (
                    <AnchorLink {...allProps} />
                );
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
