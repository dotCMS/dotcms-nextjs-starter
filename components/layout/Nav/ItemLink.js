import { NavLink } from 'react-router-dom';
import ListItem from './ListItem';
import AnchorLink from './AnchorLink';

const ItemLink = parentProps => {
    return (
        <NavLink
            component={props => {
                return parentProps.topMenu ? (
                    <ListItem parentProps={parentProps} props={props} />
                ) : (
                    <AnchorLink parentProps={parentProps} props={props} />
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
