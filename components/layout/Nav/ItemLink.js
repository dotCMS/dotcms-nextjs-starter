import { Link } from 'react-router-dom';

const ItemLink = props => {
    return (
        <Link
            className={props.className}
            to={{
                pathname: props.pathname,
                state: props.state
            }}
        >
            {props.children}
        </Link>
    );
};

export default ItemLink;
