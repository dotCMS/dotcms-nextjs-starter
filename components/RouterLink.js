import Link from 'next/link';

const RouterLink = ({ href, children, className, ariaLabel }) => {
    return (
        <Link
            href={href.includes('/store/category') ? '/store/category/[slug]' : '/[...slug]'}
            as={`${href}`}
        >
            <a aria-label={ariaLabel} className={className}>
                {children}
            </a>
        </Link>
    );
};

export default RouterLink;
