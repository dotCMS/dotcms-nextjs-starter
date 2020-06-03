import Link from 'next/link';

const RouterLink = ({ href, children, className }) => {
    return (
        <Link href="/[...slug]" as={`${href}${href !== '/index' ? '/index' : ''}`}>
            <a className={className}>{children}</a>
        </Link>
    );
};

export default RouterLink;
