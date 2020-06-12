import Link from 'next/link';

const slugMap = {
    '/store/category': '/store/category/[slug]',
    '/store/products': '/store/[[...slug]]',
    '': '/store/[[...slug]]'
};

const RouterLink = ({ href, children, className }) => {
    const slug = href
        .split('/')
        .slice(0, -1)
        .join('/');
    const file = slugMap[slug];
    return (
        <Link prefetch="true" href={file} as={`${href}`}>
            <a className={className}>{children}</a>
        </Link>
    );
};

export default RouterLink;
