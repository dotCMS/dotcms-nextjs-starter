import { Link } from 'react-router-dom';
import {PageContext} from "../../../pages/dotcms";

const ItemLink = props => {
    return (
        <PageContext.Consumer>
            {({ lang }) => (
                <Link
                    className={props.className}
                    to={{
                        pathname: props.pathname,
                        state: props.state,
                        search: `?lang=${lang}`
                    }}
                >
                    {props.children}
                </Link>
            )}
        </PageContext.Consumer>
    );
};

export default ItemLink;
