const AnchorLink = ({ href, navLinkClassName, children } = props) => (
    <a href={href} className={navLinkClassName}>
        {children}
    </a>
);

export default AnchorLink;
