import Link from 'next/link';
import ListItem from './ListItem';
import AnchorLink from './AnchorLink';

const ItemLink = ({ pathname, children }) => {
    return (
        <Link href="/dotcms" as={pathname}>
            {children}
        </Link>
    );
};

export default ItemLink;
