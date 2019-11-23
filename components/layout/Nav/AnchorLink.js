import { Link } from 'react-router-dom';

const AnchorLink = ({ href, navLinkClassName, children } = props) => (
    <Link to={href} className={navLinkClassName}>
        {children}
    </Link>
);

export default AnchorLink;
