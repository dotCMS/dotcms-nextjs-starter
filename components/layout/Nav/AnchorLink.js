const AnchorLink = ({ parentProps, props } = props) => (
    <a href={props.href} className={parentProps.className}>
        {parentProps.children}
    </a>
);

export default AnchorLink;
