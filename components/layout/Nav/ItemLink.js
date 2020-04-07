import Link from 'next/link';

const ItemLink = ({ pathname, children, className }) => {
    return (
        <Link href={pathname}>
            <a className={className}>{children}</a>
        </Link>
    );
};

export default ItemLink;
