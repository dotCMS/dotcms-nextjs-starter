import { Link } from 'react-router-dom';

const AnchorLink = ({ href, navLinkClassName, children } = props) => (
    // <Link to={href} className={navLinkClassName}>
    <a href={href} className={navLinkClassName}>
        {children}
    </a>
    // </Link>
);

export default AnchorLink;
