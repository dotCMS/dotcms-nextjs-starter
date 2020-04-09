import Link from 'next/link';

const ItemLink = ({ pathname, children, className }) => {
    return (
        <Link href="/[...slug]" as={`${pathname}${pathname !== '/index' ? '/index' : ''}`}>
            <a className={className}>{children}</a>
        </Link>
    );
};

export default ItemLink;
