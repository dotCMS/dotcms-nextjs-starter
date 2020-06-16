import Link from 'next/link';

const slugMap = {
    '/store/category': '/store/category/[slug]',
    '/store/products': '/store/[[...slug]]',
    '': '/store/[[...slug]]'
};

const RouterLink = ({ href, children, className, ariaLabel }) => {
    const slug = href.split('/').slice(0, -1).join('/');
    const file = slugMap[slug];
    return (
        <Link href={file} as={`${href}`}>
            <a aria-label={ariaLabel} className={className}>
                {children}
            </a>
        </Link>
    );
};

export default RouterLink;
