import { Link } from 'next/link';

const AnchorLink = ({ href, navLinkClassName, children } = props) => (
    <Link to="/dotcms" as={href} className={navLinkClassName}>
        <a>{children}</a>
    </Link>
);

export default AnchorLink;
